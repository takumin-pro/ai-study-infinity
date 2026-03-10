import Link from "next/link";
import Image from "next/image";

export default function Hero() {
    return (
        <section className="hero">
            <div className="container hero-content">
                <span className="hero-tagline">小学3〜6年生・算数特化</span>
                <h1>
                    わが子専用のAI家庭教師で<br />
                    「わからない」を「できた！」へ。
                </h1>
                <p className="hero-sub">
                    24時間365日対応。さかのぼり学習で苦手を徹底克服。
                </p>
                <div className="hero-cta-group">
                    <Link
                        href="https://lin.ee/L5sJlFX"
                        target="_blank"
                        className="btn btn-primary btn-lg"
                    >
                        LINEで無料診断を受ける
                    </Link>
                    <Link href="/login" className="btn btn-secondary btn-lg">
                        ログイン・マイページ
                    </Link>
                    <Link href="#contact" className="btn btn-outline btn-lg" style={{ borderColor: "#2563eb", color: "#2563eb" }}>
                        お問い合わせ・相談
                    </Link>
                </div>
                {/* LINE Add Friend Button */}
                <div style={{ marginTop: "1rem" }}>
                    <Link href="https://lin.ee/L5sJlFX">
                        <img
                            src="https://scdn.line-apps.com/n/line_add_friends/btn/ja.png"
                            alt="友だち追加"
                            height="36"
                            style={{ border: 0, height: "36px" }}
                        />
                    </Link>
                </div>
            </div>
        </section>
    );
}
