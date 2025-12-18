import React from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useLocalStorage('leaderboard', []);

    const clearHistory = () => {
        if (window.confirm('Are you sure you want to clear your typing history? This cannot be undone.')) {
            setLeaderboard([]);
        }
    };

    return (
        <div className="leaderboard-container">
            <div className="leaderboard-header">
                <h1 className="leaderboard-title">Leaderboard</h1>
                {leaderboard.length > 0 && (
                    <button 
                        onClick={clearHistory}
                        className="clear-history-btn"
                    >
                        Clear History
                    </button>
                )}
            </div>

            {leaderboard.length === 0 ? (
                <div className="empty-state">No tests taken yet. Start typing!</div>
            ) : (
                <div className="table-wrapper">
                <table className="leaderboard-table">
                    <thead>
                        <tr>
                            <th className="table-th">Date</th>
                            <th className="table-th">WPM</th>
                            <th className="table-th">Accuracy</th>
                            <th className="table-th">Mode</th>
                            <th className="table-th">Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboard.map((entry, index) => (
                            <tr key={index} className="table-tr">
                                <td className="table-td">{new Date(entry.date).toLocaleDateString()}</td>
                                <td className="table-td wpm-score">{entry.wpm}</td>
                                <td className="table-td">{entry.accuracy}%</td>
                                <td className="table-td">{entry.config.mode === 'practice' ? 'Practice' : entry.config.difficulty}</td>
                                <td className="table-td">{entry.config.duration}s</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            )}
        </div>
    );
};

export default Leaderboard;
