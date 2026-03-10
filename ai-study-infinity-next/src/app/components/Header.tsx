"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const isSimple = pathname === "/privacy" || pathname === "/law" || pathname === "/thanks";

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="header">
            <div className="container nav">
                <Link href="/" className="logo">
                    AI Study ∞
                </Link>
                {isSimple ? (
                    <Link href="/" className="btn btn-secondary" style={{ padding: "0.5rem 1rem" }}>
                        トップに戻る
                    </Link>
                ) : (
                    <>
                        <div className="mobile-menu-btn" onClick={toggleMenu}>
                            ☰
                        </div>
                        <nav className={`nav-links ${isMenuOpen ? "active" : ""}`}>
                            <Link href="/#problem" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                                お悩み
                            </Link>
                            <Link href="/#solution" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                                特徴
                            </Link>
                            <Link href="/#flow" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                                流れ
                            </Link>
                            <Link href="/#faq" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                                FAQ
                            </Link>
                            <Link
                                href="/login"
                                className="nav-link btn-secondary"
                                style={{ padding: "0.5rem 1.5rem", marginRight: "0.5rem" }}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                ログイン
                            </Link>
                            <Link
                                href="/#contact"
                                className="nav-link btn-primary"
                                style={{ color: "white", padding: "0.5rem 1.5rem" }}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                お問い合わせ
                            </Link>
                        </nav>
                    </>
                )}
            </div>
        </header>
    );
}
