import "../App.css";

function Home() {
    return (
        <div className="page">
            <h1 className="title">Quant Games</h1>

            <div className="panels">
                <div className="panel">
                    <h2>Set up your run</h2>
                    <div className="divider" />

                    <label className="field-label">Your name</label>
                    <input className="text-input" placeholder="Enter your name" />

                    <button className="primary-button">Start</button>
                </div>

                <div className="panel">
                    <h2>Leaderboard</h2>
                    <div className="divider" />
                    <p className="empty-state">No scores yet — be the first to post one.</p>
                </div>
            </div>
        </div>
    );
}

export default Home;