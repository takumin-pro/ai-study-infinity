"use client";

import { useState } from "react";

interface FAQItemProps {
    question: string;
    answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`faq-item ${isOpen ? "active" : ""}`}>
            <div className="faq-question" onClick={() => setIsOpen(!isOpen)}>
                {question}
                <span className="faq-toggle">{isOpen ? "−" : "+"}</span>
            </div>
            <div className="faq-answer">{answer}</div>
        </div>
    );
}

export default function FAQ() {
    return (
        <section id="faq" className="section">
            <div className="container">
                <h2>よくあるご質問</h2>
                <div className="faq-grid">
                    <FAQItem
                        question="本当に成績は上がりますか？"
                        answer="個人差はありますが、さかのぼり学習によって基礎の抜け漏れを埋めることで、学校の授業が理解しやすくなります。まずは「わかった！」という体験を積み重ねることが大切です。"
                    />
                    <FAQItem
                        question="料金はいくらですか？"
                        answer="詳細はお子様の学習状況や必要なサポート内容によるため、無料診断後の面談にて最適なプランをご提案させていただいております。無理な勧誘はありませんのでご安心ください。"
                    />
                    <FAQItem
                        question="パソコンやタブレットは必要ですか？"
                        answer="はい、ChatGPTが動作するPCまたはタブレット環境と、インターネット接続が必要です。スマートフォンでも利用可能ですが、学習効果を高めるため画面の大きい端末を推奨します。"
                    />
                    <FAQItem
                        question="子どもが続けられるか心配です"
                        answer="隔週の面談でモチベーション管理を徹底して行います。また、AIとの対話形式なのでゲーム感覚で取り組みやすく、一方的な動画授業より継続しやすいのが特徴です。"
                    />
                    <FAQItem
                        question="プライバシーやデータは安全ですか？"
                        answer="はい、学習データは厳重に管理されます。AIの学習にお客様の個人情報が勝手に使われることはありません（OpenAIのエンタープライズ/API仕様に準拠した設定を行います）。"
                    />
                    <FAQItem
                        question="解約はすぐにできますか？"
                        answer="はい、契約期間の縛り等はございません。毎月の更新タイミングでいつでも解約可能です。"
                    />
                </div>
            </div>
        </section>
    );
}
