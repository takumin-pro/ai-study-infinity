"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export async function signInWithGoogle() {
  const supabase = await createClient()
  const headersList = await headers()
  const origin = headersList.get("origin")

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) {
    return redirect(`/login?error=${encodeURIComponent('Google認証の初期化に失敗しました')}`)
  }

  if (data.url) {
    return redirect(data.url) // redirect to google sign in page
  }
}

export async function login(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error("Login Error:", error)
    // エラーが「Email not confirmed」等の場合にわかりやすくするため、メッセージをそのまま渡す（必要なら翻訳やハンドリングを追加）
    return redirect(`/login?error=${encodeURIComponent(error.message || 'メールアドレスまたはパスワードが間違っています')}`)
  }

  revalidatePath("/dashboard")
  return redirect("/dashboard")
}

export async function signup(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string
  const parentName = formData.get("parentName") as string
  const childGrade = formData.get("childGrade") as string

  if (password !== confirmPassword) {
    return redirect(`/signup?error=${encodeURIComponent('パスワードが一致しません')}`)
  }

  if (password.length < 6) {
    return redirect(`/signup?error=${encodeURIComponent('パスワードは6文字以上で入力してください')}`)
  }

  const supabase = await createClient()
  const headersList = await headers()
  const origin = headersList.get("origin")

  // Supabase Auth にユーザーを作成
  // (Email confirmation を有効にしている場合は確認メールが飛ぶ)
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: origin ? `${origin}/auth/callback` : undefined,
      data: {
        parent_name: parentName,
        child_grade: childGrade,
      }
    }
  })

  if (error) {
    console.error(error)
    return redirect(`/signup?error=${encodeURIComponent('ユーザ登録に失敗しました。既に登録済みのメールアドレスの可能性があります。')}`)
  }

  // 登録完了後（メール確認が無効な場合）または確認待ち画面へ
  // （ここでは簡単のため確認メール不要の設定を想定し、そのままdashboardへ）
  revalidatePath("/dashboard")
  return redirect("/dashboard")
}

export async function resetPassword(formData: FormData) {
  const email = formData.get("email") as string
  const supabase = await createClient()

  const headersList = await headers()
  const origin = headersList.get("origin")

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/update-password`,
  })

  if (error) {
    console.error(error)
    return redirect(`/forgot-password?error=${encodeURIComponent('メール送信に失敗しました')}`)
  }

  return redirect(`/forgot-password?message=${encodeURIComponent('パスワードリセット用のメールを送信しました')}`)
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  return redirect("/login")
}
