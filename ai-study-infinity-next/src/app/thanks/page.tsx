import Link from "next/link";

export default function Thanks() {
    return (
        <div className="thanks-content">
            <div className="check-icon-large">✓</div>
            <h1>お問い合わせありがとうございます</h1>
            <p>
                確認メールを自動送信いたしました。<br />
                担当者より24時間以内にご連絡させていただきます。
            </p>
            <div style={{ marginTop: "2rem" }}>
                <Link href="/" className="btn btn-primary">
                    トップページに戻る
                </Link>
            </div>
        </div>
    );
}
