import React, { useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import './pages.css';

const Leaderboard = () => {
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, easy, medium, hard
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        setLoading(true);
        let url = `/api/scores?page=${page}&limit=5`;
        if (filter !== 'all') {
            url += `&difficulty=${filter}`;
        }
        
        fetch(url)
            .then(res => res.json())
            .then(data => {
                // Handle both old array format (fallback) and new object format
                if (Array.isArray(data)) {
                    setScores(data);
                    setTotalPages(1);
                } else {
                    setScores(data.scores);
                    setTotalPages(data.totalPages);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch leaderboard", err);
                setLoading(false);
            });
    }, [filter, page]);

    // Reset page when filter changes
    const handleFilterChange = (e) => {
        setFilter(e.target.value);
        setPage(1);
    };

    return (
        <div className="leaderboard-container">
            <div className="leaderboard-header">
                <h1 className="leaderboard-title">Global <span>Leaderboard</span> 🏆</h1>
                
                <div className="filter-group">
                    <label className="filter-label">Filter by:</label>
                    <select 
                        value={filter} 
                        onChange={handleFilterChange}
                        className="filter-select"
                    >
                        <option value="all">All Levels</option>
                        <option value="easy">🌱 Easy</option>
                        <option value="medium">⚖️ Medium</option>
                        <option value="hard">🔥 Hard</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="loading-state" style={{textAlign: 'center', padding: '2rem'}}>Loading scores...</div>
            ) : scores.length === 0 ? (
                <div className="empty-state">No scores yet. Be the first!</div>
            ) : (
                <>
                <div className="table-wrapper">
                    <table className="leaderboard-table">
                        <thead>
                            <tr>
                                <th className="table-th">Rank</th>
                                <th className="table-th">Name</th>
                                <th className="table-th">WPM</th>
                                <th className="table-th">Accuracy</th>
                                <th className="table-th">Difficulty</th>
                                <th className="table-th">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scores.map((entry, index) => (
                                <tr key={entry._id || index} className="table-tr">
                                    <td className="table-td">
                                        {(page - 1) * 5 + index + 1}
                                    </td>
                                    <td className="table-td" style={{fontWeight: 'bold', color: '#e2e8f0'}}>{entry.name}</td>
                                    <td className="table-td wpm-score">{entry.wpm}</td>
                                    <td className="table-td">{entry.accuracy}%</td>
                                    <td className="table-td" style={{textTransform: 'capitalize'}}>
                                        <span className={`badge ${entry.difficulty}`}>
                                            {entry.difficulty}
                                        </span>
                                    </td>
                                    <td className="table-td">{new Date(entry.date).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="pagination-controls" style={{
                    display: 'flex', 
                    justifyContent: 'center', 
                    gap: '1rem', 
                    marginTop: '2rem',
                    alignItems: 'center'
                }}>
                    <button 
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="result-btn"
                        style={{opacity: page === 1 ? 0.5 : 1}}
                    >
                        Previous
                    </button>
                    <span style={{color: 'var(--textSecondary)'}}>
                        Page {page} of {totalPages}
                    </span>
                    <button 
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="result-btn"
                        style={{opacity: page === totalPages ? 0.5 : 1}}
                    >
                        Next
                    </button>
                </div>
                </>
            )}
        </div>
    );
};

export default Leaderboard;
