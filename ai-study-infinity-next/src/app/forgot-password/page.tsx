"use client"

import { useState } from "react"
import { resetPassword } from "@/app/actions/auth"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import styles from "@/app/auth.module.css"

export default function ForgotPasswordPage() {
  const searchParams = useSearchParams()
  const errorParam = searchParams.get("error")
  const messageParam = searchParams.get("message")
  
  const [isPending, setIsPending] = useState(false)

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>パスワード再設定</h1>
        <p className={styles.subtitle}>登録したメールアドレスを入力してください。再設定用のリンクをお送りします。</p>

        {errorParam && (
          <div className={styles.error}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            {errorParam}
          </div>
        )}

        {messageParam && (
          <div className={styles.message}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            {messageParam}
          </div>
        )}

        <form action={resetPassword} onSubmit={() => setIsPending(true)} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              メールアドレス
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="example@example.com"
              className={styles.input}
            />
          </div>

          <button 
            type="submit" 
            className={`${styles.button} ${isPending ? styles.buttonDisabled : ""}`}
            disabled={isPending}
          >
            {isPending ? "送信中..." : "再設定リンクを送信する"}
          </button>
        </form>

        <div className={styles.links}>
          <div style={{ marginTop: "1rem" }}>
            <Link href="/login" className={styles.link}>
              ログイン画面に戻る
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
