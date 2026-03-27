import { createClient } from "@/utils/supabase/server"
import { logout } from "@/app/actions/auth"
import { redirect } from "next/navigation"
import ChildrenManager from "./ChildrenManager"

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  const supabase = await createClient()

  // 1. ユーザー認証の確認
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return redirect("/login")
  }

  // 2. 保護者情報（profiles）の取得
  const { data: profile } = await supabase
    .from("profiles")
    .select("parent_name, email")
    .eq("id", user.id)
    .single()

  // 3. 登録済みの子ども一覧（children）を取得
  const { data: children, error: childrenError } = await supabase
    .from("children")
    .select("*")
    .eq("parent_id", user.id)
    .order("created_at", { ascending: true })

  if (childrenError && childrenError.code !== "42P01") {
    // 42P01 is relation does not exist, safe to ignore if not created yet
    console.error("子ども一覧取得エラー", childrenError)
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: "sans-serif" }}>
      {/* Header */}
      <header style={{ backgroundColor: "white", padding: "1rem 2rem", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#2563eb" }}>AI Study ∞ マイページ</div>
        <form action={logout}>
          <button type="submit" style={{ padding: "0.5rem 1rem", fontSize: "0.875rem", color: "#64748b", backgroundColor: "transparent", border: "1px solid #cbd5e1", borderRadius: "0.375rem", cursor: "pointer" }}>
            ログアウト
          </button>
        </form>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        
        {/* Page Title */}
        <h1 style={{ fontSize: "1.875rem", fontWeight: "bold", color: "#1e293b", marginBottom: "2rem" }}>ダッシュボード</h1>
        
        {/* Parent Info Section */}
        <section style={{ backgroundColor: "white", padding: "1.5rem", borderRadius: "0.5rem", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", marginBottom: "2.5rem", borderLeft: "4px solid #10b981" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#334155", marginBottom: "1rem", borderBottom: "1px solid #e2e8f0", paddingBottom: "0.5rem" }}>保護者情報</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
            <div>
              <p style={{ fontSize: "0.875rem", color: "#64748b", marginBottom: "0.25rem" }}>お名前</p>
              <p style={{ fontSize: "1.125rem", color: "#0f172a", fontWeight: "500" }}>{profile?.parent_name || user.user_metadata?.parent_name || "未登録"}</p>
            </div>
            <div>
              <p style={{ fontSize: "0.875rem", color: "#64748b", marginBottom: "0.25rem" }}>メールアドレス</p>
              <p style={{ fontSize: "1.125rem", color: "#0f172a", fontWeight: "500" }}>{user.email}</p>
            </div>
          </div>
        </section>

        {/* Children Management (Client Component) */}
        <ChildrenManager initialChildren={children || []} />

        {/* Dashboard Tools / Placeholder */}
        <section style={{ marginTop: "3.5rem" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#334155", marginBottom: "1rem" }}>各種ツール・お知らせ</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
            <div style={{ backgroundColor: "white", padding: "1.5rem", borderRadius: "0.5rem", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <h3 style={{ fontWeight: "600", color: "#334155", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  📢 お知らせ・アップデート
                </h3>
                <p style={{ color: "#64748b", fontSize: "0.875rem", lineHeight: "1.5" }}>今後の学習プラン追加やシステムメンテナンスの情報など、塾からの重要なお知らせがここに表示されます。</p>
              </div>
              <div style={{ marginTop: "1rem", color: "#94a3b8", fontSize: "0.75rem", textAlign: "right" }}>（準備中）</div>
            </div>
            
            <div style={{ backgroundColor: "white", padding: "1.5rem", borderRadius: "0.5rem", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <h3 style={{ fontWeight: "600", color: "#334155", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  📊 月間学習レポート
                </h3>
                <p style={{ color: "#64748b", fontSize: "0.875rem", lineHeight: "1.5" }}>お子様の毎月の学習状況や、得意・苦手分野のAI分析結果をまとめて確認できるレポート機能です。</p>
              </div>
              <div style={{ marginTop: "1rem", color: "#94a3b8", fontSize: "0.75rem", textAlign: "right" }}>（準備中）</div>
            </div>
          </div>
        </section>

      </main>
    </div>
  )
}
