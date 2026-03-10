import Link from "next/link";

export default function Contact() {
    return (
        <section id="contact" className="section bg-alt">
            <div className="container">
                <div className="text-center">
                    <h2 style={{ marginBottom: "1rem" }}>まずは無料診断から</h2>
                    <p style={{ marginBottom: "2rem" }}>
                        お子様の学習状況を整理し、最適なプランをご提案します。
                    </p>
                    <Link
                        href="https://lin.ee/L5sJlFX"
                        target="_blank"
                        className="btn btn-primary btn-lg"
                        style={{ marginBottom: "1rem" }}
                    >
                        LINEで無料診断（1分で完了）
                    </Link>
                    <div style={{ marginBottom: "3rem" }}>
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

                <div className="form-container">
                    <h3 className="text-center" style={{ marginBottom: "2rem" }}>
                        お問い合わせフォーム
                    </h3>
                    <iframe
                        src="https://docs.google.com/forms/d/e/1FAIpQLSe3ZCGvPB3sVKwToEXSW_vBKAV7vyTlAmcoCkLAV71NQwCu9g/viewform?embedded=true"
                        className="google-form-iframe"
                        title="お問い合わせフォーム"
                    >
                        読み込んでいます…
                    </iframe>
                </div>
            </div>
        </section>
    );
}
