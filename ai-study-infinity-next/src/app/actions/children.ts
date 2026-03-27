"use server"

import { createClient } from "@/utils/supabase/server"

// アクション結果の型定義
export type ActionResult = {
  error?: string;
  success?: boolean;
}

// === 子どもの登録処理 (Insert) ===
export async function addChild(formData: FormData): Promise<ActionResult> {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: "ログインが必要です" }
  }

  // フォームデータから値を取得
  const nickname = formData.get("nickname") as string
  const grade = formData.get("grade") as string
  const subject = formData.get("subject") as string
  const learningLevel = formData.get("learning_level") as string
  const learningGoal = formData.get("learning_goal") as string

  if (!nickname || !grade) {
    return { error: "ニックネームと学年は必須項目です" }
  }

  // Supabaseの public.children テーブルへInsert
  const { error } = await supabase.from("children").insert({
    parent_id: user.id, // auth.uid() と紐付け
    nickname,
    grade,
    subject: subject || null,
    learning_level: learningLevel || null,
    learning_goal: learningGoal || null,
  })

  if (error) {
    console.error("子ども追加エラー:", error)
    return { error: "登録に失敗しました。システムエラーが発生しました。" }
  }

  return { success: true }
}

// === 子どもの削除処理 (Delete) ===
export async function deleteChild(id: string): Promise<ActionResult> {
  const supabase = await createClient()

  // 対象の子どもを削除（バックエンドの制限により自分の子しか消せません: RLS設定済み）
  const { error } = await supabase.from("children").delete().eq("id", id)

  if (error) {
    console.error("子ども削除エラー:", error)
    return { error: "削除に失敗しました" }
  }

  return { success: true }
}

// === 子どもの情報更新処理 (Update) - 今後の拡張用 ===
export async function updateChild(id: string, formData: FormData): Promise<ActionResult> {
  const supabase = await createClient()
  
  const nickname = formData.get("nickname") as string
  const grade = formData.get("grade") as string
  const subject = formData.get("subject") as string
  const learningLevel = formData.get("learning_level") as string
  const learningGoal = formData.get("learning_goal") as string

  const { error } = await supabase.from("children").update({
    nickname,
    grade,
    subject: subject || null,
    learning_level: learningLevel || null,
    learning_goal: learningGoal || null,
  }).eq("id", id)

  if (error) {
    console.error("子ども更新エラー:", error)
    return { error: "更新に失敗しました" }
  }

  return { success: true }
}
