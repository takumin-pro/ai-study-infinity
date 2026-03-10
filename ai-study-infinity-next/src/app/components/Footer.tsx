"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
    const pathname = usePathname();
    const isSimple = pathname === "/privacy" || pathname === "/law" || pathname === "/thanks";

    return (
        <footer className="footer">
            <div className="container">
                {!isSimple && (
                    <div className="footer-grid">
                        <div>
                            <div className="logo" style={{ marginBottom: "1rem" }}>
                                AI Study ∞
                            </div>
                            <p style={{ fontSize: "0.9rem", color: "#bdc3c7" }}>
                                未来を生きる子供たちのために、<br />
                                最適な学習環境を提供します。
                            </p>
                        </div>
                        <div className="footer-links">
                            <h4>About</h4>
                            <Link href="/#problem">お悩み</Link>
                            <Link href="/#solution">特徴</Link>
                            <Link href="/#flow">ご利用の流れ</Link>
                        </div>
                        <div className="footer-links">
                            <h4>Support</h4>
                            <Link href="/#faq">FAQ</Link>
                            <Link href="/#contact">お問い合わせ</Link>
                            <Link href="/privacy">プライバシーポリシー</Link>
                            <Link href="/law">特定商取引法に基づく表記</Link>
                        </div>
                    </div>
                )}
                <div className="copyright">
                    &copy; 2024 AI Study ∞. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
}
