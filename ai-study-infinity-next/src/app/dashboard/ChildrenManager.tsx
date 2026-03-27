"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { addChild, deleteChild } from "@/app/actions/children"

export type Child = {
  id: string
  nickname: string
  grade: string
  subject: string | null
  learning_level: string | null
  learning_goal: string | null
}

export default function ChildrenManager({ initialChildren }: { initialChildren: Child[] }) {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  
  // 今後拡張（編集モードへの切り替え用ステート）
  const [editingChildId, setEditingChildId] = useState<string | null>(null)

  const router = useRouter()

  const handleCreateSubmit = async (formData: FormData) => {
    setError(null)
    const res = await addChild(formData)
    
    if (res?.error) {
      setError(res.error)
    } else {
      setIsFormOpen(false)
      // 新しいデータを取得するためにサーバーコンポーネントを再描画
      startTransition(() => {
        router.refresh()
      })
    }
  }

  const handleDelete = async (id: string, nickname: string) => {
    if (confirm(`${nickname}さんの情報を削除して本当によろしいですか？`)) {
      const res = await deleteChild(id)
      if (res?.error) {
        alert(res.error)
      } else {
        startTransition(() => {
          router.refresh()
        })
      }
    }
  }

  return (
    <section>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", borderBottom: "2px solid #e2e8f0", paddingBottom: "0.5rem" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#334155" }}>お子様の学習管理</h2>
        {!isFormOpen && (
          <button 
            onClick={() => setIsFormOpen(true)}
            style={{ backgroundColor: "#2563eb", color: "white", padding: "0.5rem 1rem", borderRadius: "0.375rem", fontSize: "0.875rem", fontWeight: "500", cursor: "pointer", border: "none" }}
          >
            ＋ 新しく子どもを登録
          </button>
        )}
      </div>

      {/* エラー表示エリア */}
      {error && (
        <div style={{ backgroundColor: "#fee2e2", color: "#b91c1c", padding: "1rem", borderRadius: "0.5rem", marginBottom: "1.5rem", border: "1px solid #f87171" }}>
          <p style={{ fontWeight: "bold" }}>エラーが発生しました</p>
          <p>{error}</p>
        </div>
      )}

      {/* 登録フォーム */}
      {isFormOpen && (
        <div style={{ backgroundColor: "white", padding: "1.5rem", borderRadius: "0.5rem", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)", marginBottom: "2rem", borderTop: "4px solid #3b82f6" }}>
          <h3 style={{ fontSize: "1.125rem", fontWeight: "600", marginBottom: "1rem" }}>お子様の情報登録</h3>
          <form action={handleCreateSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <label htmlFor="nickname" style={{ fontSize: "0.875rem", fontWeight: "500", color: "#475569" }}>ニックネーム（必須）</label>
                <input id="nickname" name="nickname" type="text" required placeholder="たろう" style={{ padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #cbd5e1" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <label htmlFor="grade" style={{ fontSize: "0.875rem", fontWeight: "500", color: "#475569" }}>学年（必須）</label>
                <select id="grade" name="grade" required style={{ padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #cbd5e1", backgroundColor: "white" }}>
                  <option value="">選択してください</option>
                  <option value="小学3年生">小学3年生</option>
                  <option value="小学4年生">小学4年生</option>
                  <option value="小学5年生">小学5年生</option>
                  <option value="小学6年生">小学6年生</option>
                </select>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <label htmlFor="subject" style={{ fontSize: "0.875rem", fontWeight: "500", color: "#475569" }}>重点教科</label>
                <select id="subject" name="subject" style={{ padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #cbd5e1", backgroundColor: "white" }}>
                  <option value="">（選択なし）</option>
                  <option value="算数">算数</option>
                  <option value="国語">国語</option>
                  <option value="理科">理科</option>
                  <option value="社会">社会</option>
                </select>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <label htmlFor="learning_level" style={{ fontSize: "0.875rem", fontWeight: "500", color: "#475569" }}>現在の学習レベル</label>
                <select id="learning_level" name="learning_level" style={{ padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #cbd5e1", backgroundColor: "white" }}>
                  <option value="">（選択なし）</option>
                  <option value="基礎からしっかり">基礎からしっかり（さかのぼり）</option>
                  <option value="学校の進度に合わせて">学校の進度に合わせて</option>
                  <option value="先取り・応用学習">先取り・応用学習</option>
                </select>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label htmlFor="learning_goal" style={{ fontSize: "0.875rem", fontWeight: "500", color: "#475569" }}>学習目標や気になること（任意）</label>
              <textarea id="learning_goal" name="learning_goal" rows={3} placeholder="例：算数の文章問題が苦手なので克服したい" style={{ padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #cbd5e1", resize: "vertical" }}></textarea>
            </div>

            <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end", marginTop: "0.5rem" }}>
              <button 
                type="button" 
                onClick={() => setIsFormOpen(false)}
                style={{ padding: "0.5rem 1rem", backgroundColor: "white", color: "#475569", border: "1px solid #cbd5e1", borderRadius: "0.375rem", cursor: "pointer" }}
                disabled={isPending}
              >
                キャンセル
              </button>
              <button 
                type="submit" 
                style={{ padding: "0.5rem 1.5rem", backgroundColor: "#2563eb", color: "white", border: "none", borderRadius: "0.375rem", cursor: isPending ? "not-allowed" : "pointer", opacity: isPending ? 0.7 : 1 }}
                disabled={isPending}
              >
                {isPending ? "登録中..." : "保存する"}
              </button>
            </div>

          </form>
        </div>
      )}

      {/* 待機中のプレースホルダー */}
      {isPending && !isFormOpen && (
        <div style={{ textAlign: "center", padding: "2rem", color: "#64748b" }}>
          更新中...
        </div>
      )}

      {/* 子ども一覧表示 */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem", opacity: isPending ? 0.6 : 1, transition: "opacity 0.2s" }}>
        
        {initialChildren.length === 0 && !isFormOpen ? (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "3rem", backgroundColor: "white", borderRadius: "0.5rem", border: "1px dashed #cbd5e1" }}>
            <h3 style={{ fontSize: "1.125rem", color: "#475569", marginBottom: "0.5rem" }}>お子様の情報がまだ登録されていません</h3>
            <p style={{ color: "#94a3b8", marginBottom: "1.5rem", fontSize: "0.875rem" }}>新しく追加して、AI学習プランを設定しましょう。</p>
            <button 
              onClick={() => setIsFormOpen(true)}
              style={{ backgroundColor: "#2563eb", color: "white", padding: "0.5rem 1.5rem", borderRadius: "0.375rem", fontWeight: "500", cursor: "pointer", border: "none" }}
            >
              ＋ 最初のお子様を登録
            </button>
          </div>
        ) : (
          initialChildren.map((child) => (
            <div key={child.id} style={{ backgroundColor: "white", borderRadius: "0.5rem", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", overflow: "hidden", border: "1px solid #e2e8f0" }}>
              <div style={{ backgroundColor: "#f8fafc", padding: "1rem", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ fontSize: "1.125rem", fontWeight: "bold", color: "#1e293b", margin: 0 }}>
                  {child.nickname} <span style={{ fontSize: "0.875rem", fontWeight: "normal", color: "#64748b" }}>さん</span>
                </h3>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button 
                    onClick={() => setEditingChildId(child.id)}
                    style={{ background: "none", border: "none", color: "#3b82f6", fontSize: "0.875rem", cursor: "pointer" }}
                  >
                    編集
                  </button>
                  <button 
                    onClick={() => handleDelete(child.id, child.nickname)}
                    style={{ background: "none", border: "none", color: "#ef4444", fontSize: "0.875rem", cursor: "pointer" }}
                  >
                    削除
                  </button>
                </div>
              </div>

              <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <div style={{ display: "flex", fontSize: "0.875rem" }}>
                  <span style={{ color: "#64748b", width: "80px" }}>学年:</span>
                  <span style={{ color: "#0f172a", fontWeight: "500" }}>{child.grade}</span>
                </div>
                <div style={{ display: "flex", fontSize: "0.875rem" }}>
                  <span style={{ color: "#64748b", width: "80px" }}>学習レベル:</span>
                  <span style={{ color: "#0f172a", fontWeight: "500" }}>{child.learning_level || "未設定"}</span>
                </div>
                <div style={{ display: "flex", fontSize: "0.875rem" }}>
                  <span style={{ color: "#64748b", width: "80px" }}>学習目標:</span>
                  <span style={{ color: "#0f172a" }}>{child.learning_goal || "未設定"}</span>
                </div>

                <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <button style={{ width: "100%", padding: "0.75rem", backgroundColor: "#eff6ff", color: "#1d4ed8", fontWeight: "600", borderRadius: "0.375rem", border: "1px solid #bfdbfe", cursor: "pointer", transition: "all 0.2s" }}>
                    初回AI診断に進む →
                  </button>
                  <button style={{ width: "100%", padding: "0.5rem", backgroundColor: "white", color: "#475569", borderRadius: "0.375rem", border: "1px solid #cbd5e1", cursor: "pointer", fontSize: "0.875rem" }}>
                    学習プラン・問題へ
                  </button>
                </div>
              </div>

              {/* 簡易的な編集モードのプレースホルダー表示 */}
              {editingChildId === child.id && (
                <div style={{ padding: "1rem", backgroundColor: "#fef2f2", color: "#991b1b", fontSize: "0.875rem", borderTop: "1px solid #fecaca" }}>
                  ※MVP版のため、編集機能はまだ有効化されていません。削除して再登録してください。<br/>
                  <button onClick={() => setEditingChildId(null)} style={{ marginTop: "0.5rem", padding: "0.25rem 0.5rem", background: "white", border: "1px solid #fca5a5", borderRadius: "4px", cursor: "pointer" }}>閉じる</button>
                </div>
              )}

            </div>
          ))
        )}
      </div>
    </section>
  )
}
