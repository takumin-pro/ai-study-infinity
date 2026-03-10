"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileStickyCTA() {
    const pathname = usePathname();
    const isSimple = pathname === "/privacy" || pathname === "/law" || pathname === "/thanks";

    if (isSimple) return null;

    return (
        <div className="mobile-sticky-cta">
            <Link
                href="https://lin.ee/L5sJlFX"
                target="_blank"
                className="btn btn-primary"
                style={{ width: "100%", padding: "0.8rem" }}
            >
                LINEで無料診断を受ける
            </Link>
        </div>
    );
}
