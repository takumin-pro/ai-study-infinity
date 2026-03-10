export default function Solution() {
    return (
        <section id="solution" className="section bg-alt">
            <div className="container">
                <h2>AI Study ∞ の解決策</h2>
                <div className="solution-grid">
                    <div>
                        <div className="solution-item">
                            <span className="check-icon">✔</span>
                            <div>
                                <h4>お子様専用のGPTsを作成</h4>
                                <p>
                                    一人ひとりの理解度や性格に合わせたカスタムAI（GPTs）を提供。API連携で学習データを分析します。
                                </p>
                            </div>
                        </div>
                        <div className="solution-item">
                            <span className="check-icon">✔</span>
                            <div>
                                <h4>24時間365日 いつでも質問OK</h4>
                                <p>
                                    「今わからない」をその場で解決。AIだから何度同じ質問をしても怒らず優しく教えます。
                                </p>
                            </div>
                        </div>
                        <div className="solution-item">
                            <span className="check-icon">✔</span>
                            <div>
                                <h4>隔週の三者面談で安心</h4>
                                <p>
                                    AI任せにはしません。学習ログを元に、スタッフ・親・子どもの三者で振り返りを行います。
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="report-mock">
                        {/* Using a placeholder image for now, as in the original code */}
                        <img
                            src="https://placehold.co/600x400/e6f0ff/0056b3?text=Sample+Learning+Report"
                            alt="学習レポートのサンプル画像"
                        />
                        <p style={{ marginTop: "0.5rem", fontSize: "0.9rem", color: "#666" }}>
                            ※理解度や継続率が一目でわかるレポート（開発中イメージ）
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
