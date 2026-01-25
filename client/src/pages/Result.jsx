
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResult } from '../context/ResultContext';
import withProtection from '../hoc/withProtection';
import useLocalStorage from '../hooks/useLocalStorage';

const Result = () => {
    const { result, testConfig, userName } = useResult();
    const navigate = useNavigate();
    const [, setLeaderboard] = useLocalStorage('leaderboard', []);
    const savedRef = useRef(false);

    useEffect(() => {
        if (result && testConfig.mode === 'test' && !savedRef.current) {
            savedRef.current = true;
            // Prevent duplicate saves using a timestamp check if needed, 
            // but useRef handles strict mode overlap mostly.
            
            setLeaderboard(prev => {
                // Double check logical duplicate based on date/value key
                const exists = prev.some(item => item.date === result.date);
                if (exists) return prev;

                const newEntry = { ...result, config: testConfig };
                // Keep only top 50 or last 50? Let's just append.
                return [newEntry, ...prev];
            });

            // Save to Backend
            if (userName) {
                fetch('/api/scores', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: userName,
                        wpm: result.wpm,
                        accuracy: result.accuracy,
                        difficulty: testConfig.difficulty,
                        mode: testConfig.mode,
                        // date: result.date // managed by backend default or pass it
                    })
                }).then(async res => {
                    const data = await res.json();
                    if (!res.ok) {
                        throw new Error(data.error || 'Server returned error');
                    }
                    console.log('Score saved:', data);
                }).catch(err => {
                    console.error('Error saving score:', err);
                    alert(`⚠️ Error saving score: ${err.message}\nPlease check your internet or Vercel Database config.`);
                });
            }
        }
    }, [result, testConfig, setLeaderboard, userName]);

    if (!result) return null; // Should be handled by HOC

    return (
        <div className="result-container">
            <div className="score-card">
                <div className="main-stat">
                    <h2 className="stat-value">{result.wpm}</h2>
                    <p className="stat-label">WPM</p>
                </div>
                
                <div className="secondary-stat">
                    <h3 className="value-small">{result.accuracy}%</h3>
                    <span className="label-small">Accuracy</span>
                </div>

                <div className="secondary-stat">
                    <h3 className="value-small">{result.mistakes}</h3>
                    <span className="label-small">Mistakes</span>
                </div>
                
                <div className="secondary-stat">
                    <h3 className="value-small">{result.totalChars}</h3>
                    <span className="label-small">Characters</span>
                </div>

                <div className="secondary-stat">
                    <h3 className="value-small">{result.timeTaken}s</h3>
                    <span className="label-small">Time</span>
                </div>
            </div>

            <div className="button-group">
                <button className="result-btn primary" onClick={() => navigate('/test')}>Try Again</button>
                <button className="result-btn" onClick={() => navigate('/leaderboard')}>View Leaderboard</button>
                <button className="result-btn" onClick={() => navigate('/')}>Back to Home</button>
            </div>
        </div>
    );
};

const ProtectedResult = withProtection(Result);
export default ProtectedResult;
