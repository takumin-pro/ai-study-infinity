import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  // middlewareでは cookieStore.getAll/setAll を用いてセッションをリフレッシュする
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // セッションを取得 (トークンをリフレッシュする必要がある場合はこれでリフレッシュされる)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // protected routes (ダッシュボードなど) へのアクセス制御
  // 未ログインユーザーが /dashboard 以下のルートにアクセスした場合は /login にリダイレクト
  if (request.nextUrl.pathname.startsWith("/dashboard") && !user) {
    // リダイレクト先に元のURLを含めたい場合は以下のようにする
    // const url = request.nextUrl.clone()
    // url.pathname = "/login"
    // url.searchParams.set("next", request.nextUrl.pathname)
    // return NextResponse.redirect(url)
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // ログイン済みユーザーが /login, /signup にアクセスした場合は /dashboard にリダイレクト
  if ((request.nextUrl.pathname.startsWith("/login") || request.nextUrl.pathname.startsWith("/signup")) && user) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images, icons, robots.txt, etc.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
