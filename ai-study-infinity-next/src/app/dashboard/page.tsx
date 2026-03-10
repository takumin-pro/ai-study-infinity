import { createClient } from "@/utils/supabase/server"
import { logout } from "@/app/actions/auth"
import { redirect } from "next/navigation"
import styles from "@/app/auth.module.css"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect("/login")
  }

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <div className={styles.headerTitle}>オンライン塾 マイページ</div>
        <form action={logout}>
          <button type="submit" className={styles.logoutButton}>
            ログアウト
          </button>
        </form>
      </header>

      <main className={styles.mainContent}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "1.5rem", color: "#1e293b" }}>
          ダッシュボードへようこそ
        </h2>
        <div style={{ padding: "1.5rem", backgroundColor: "#f1f5f9", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
          <p style={{ marginBottom: "0.5rem", color: "#64748b", fontSize: "0.875rem", fontWeight: "600" }}>ログイン中のアカウント</p>
          <p style={{ color: "#0f172a", fontSize: "1.125rem" }}>{user.email}</p>
        </div>
        
        <div style={{ marginTop: "2rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
          {/* ダミーコンテンツ */}
          <div style={{ padding: "1.5rem", border: "1px solid #e2e8f0", borderRadius: "8px" }}>
            <h3 style={{ fontWeight: "600", marginBottom: "0.5rem", color: "#334155" }}>学習状況</h3>
            <p style={{ color: "#64748b", fontSize: "0.875rem" }}>現在の進捗やテスト結果を確認できます。</p>
          </div>
          <div style={{ padding: "1.5rem", border: "1px solid #e2e8f0", borderRadius: "8px" }}>
            <h3 style={{ fontWeight: "600", marginBottom: "0.5rem", color: "#334155" }}>お知らせ</h3>
            <p style={{ color: "#64748b", fontSize: "0.875rem" }}>塾からの重要なお知らせが届いています。</p>
          </div>
        </div>
      </main>
    </div>
  )
}
