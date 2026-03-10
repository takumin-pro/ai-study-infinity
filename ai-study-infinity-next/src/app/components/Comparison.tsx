export default function Comparison() {
    return (
        <section className="section">
            <div className="container">
                <h2>他社サービスとの違い</h2>
                <div className="comparison-table-wrapper">
                    <table className="comparison-table">
                        <thead>
                            <tr>
                                <th>比較項目</th>
                                <th>学習塾・家庭教師</th>
                                <th>通信教材</th>
                                <th>AI Study ∞</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>質問対応</td>
                                <td>授業中のみ/限度あり</td>
                                <td>なし/回答に時間がかかる</td>
                                <td className="highlight-cell">24時間即レス・無制限</td>
                            </tr>
                            <tr>
                                <td>カリキュラム</td>
                                <td>全員同じ</td>
                                <td>全員同じ</td>
                                <td className="highlight-cell">完全パーソナライズ</td>
                            </tr>
                            <tr>
                                <td>振り返り・サポート</td>
                                <td>面談は年に数回</td>
                                <td>ほぼ親任せ</td>
                                <td className="highlight-cell">隔週で進捗確認</td>
                            </tr>
                            <tr>
                                <td>場所・時間</td>
                                <td>通塾が必要/固定時間</td>
                                <td>自由だが強制力なし</td>
                                <td className="highlight-cell">好きな時＆面談で習慣化</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
