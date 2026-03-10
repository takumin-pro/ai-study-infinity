export default function Problem() {
    return (
        <section id="problem" className="section">
            <div className="container">
                <h2>こんなお悩みありませんか？</h2>
                <div className="problem-grid">
                    <div className="problem-card">
                        <div className="problem-icon">📉</div>
                        <h3>学校の授業についていけない</h3>
                        <p>算数が難しくなってきて、どこでつまずいたのかわからない。</p>
                    </div>
                    <div className="problem-card">
                        <div className="problem-icon">🏠</div>
                        <h3>家で教える時間がない</h3>
                        <p>
                            親が教えるとついイライラしてしまう、忙しくて見てあげられない。
                        </p>
                    </div>
                    <div className="problem-card">
                        <div className="problem-icon">🏫</div>
                        <h3>塾に通わせても成果が出ない</h3>
                        <p>集団塾だと質問できず、結局わからないまま進んでしまう。</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
