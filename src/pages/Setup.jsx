import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useResult } from '../context/ResultContext';

const Setup = () => {
    const { testConfig, setTestConfig } = useResult();
    const navigate = useNavigate();
    const [description, setDescription] = React.useState('');

    const handleDurationChange = (d) => setTestConfig(prev => ({ ...prev, duration: parseInt(d) || 0 }));
    
    // Auto-adjust duration based on difficulty
    const handleDifficultyChange = (d) => {
        const recommendedTime = {
            'easy': 60,
            'medium': 90,
            'hard': 120
        };
        
        setTestConfig(prev => ({ 
            ...prev, 
            difficulty: d,
            duration: recommendedTime[d] || 60 
        }));
    };

    const handleModeChange = (m) => setTestConfig(prev => ({ ...prev, mode: m }));

    // Dynamic Description
    React.useEffect(() => {
        const { difficulty, mode } = testConfig;
        if (mode === 'practice') {
            setDescription("Practice Mode: Untimed. Type at your own pace without pressure.");
        } else {
            const diffDesc = {
                'easy': "Simple sentences, standard vocabulary. Great for warming up.",
                'medium': "Standard text with average complexity. The standard typing test.",
                'hard': "Complex vocabulary, scientific terms, and punctuation. For experts."
            };
            setDescription(diffDesc[difficulty]);
        }
    }, [testConfig]);

    const startTest = () => {
        navigate('/test');
    };

    return (
        <div className="setup-container">
            <div style={{marginBottom: '2rem'}}>
                <h1 className="setup-title">Configure <span>Test</span></h1>
            </div>

            <div className="setup-content">
                <div className="instructions-panel">
                    <h2>How to Play 🎮</h2>
                    <ul>
                        <li><strong>Select Mode:</strong> Choose 'Practice' for a relaxed session or 'Test' to challenge yourself.</li>
                        <li><strong>Set Difficulty:</strong> Higher difficulty means longer texts and complex words.</li>
                        <li><strong>Focus:</strong> Accuracy counts! Mistakes will lower your final WPM score.</li>
                        <li><strong>Start:</strong> The timer begins as soon as you type the first character.</li>
                    </ul>
                    
                    <div className="tip">
                        <strong>💡 Pro Tip:</strong> Use <code>Ctrl + Backspace</code> to delete whole words and speed up corrections!
                    </div>
                </div>

                <div className="config-section">
                    <div className="config-group">
                        <label className="config-label">Time (Seconds)</label>
                        <div className="setup-btn-group">
                            {[60, 90, 120].map(sec => (
                                <button 
                                    key={sec} 
                                    className={`option-btn ${testConfig.duration === sec ? 'active' : ''}`}
                                    onClick={() => handleDurationChange(sec)}
                                >
                                    {sec}s
                                </button>
                            ))}
                            <input 
                                className="custom-time-input"
                                type="number" 
                                min="10" 
                                max="600"
                                placeholder="Custom"
                                value={testConfig.duration}
                                onChange={(e) => handleDurationChange(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="config-group">
                        <label className="config-label">Difficulty</label>
                        <div className="setup-btn-group">
                            {['easy', 'medium', 'hard'].map(diff => (
                                <button 
                                    key={diff} 
                                    className={`option-btn ${testConfig.difficulty === diff ? 'active' : ''}`}
                                    onClick={() => handleDifficultyChange(diff)}
                                    style={{textTransform: 'capitalize'}}
                                >
                                    {diff === 'easy' && '🌱 '}
                                    {diff === 'medium' && '⚖️ '}
                                    {diff === 'hard' && '🔥 '}
                                    {diff}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                     <div className="config-group">
                        <label className="config-label">Mode</label>
                        <div className="setup-btn-group">
                            {[
                                {id: 'test', label: 'Test Mode'},
                                {id: 'practice', label: 'Practice'}
                            ].map(mode => (
                                <button 
                                    key={mode.id} 
                                    className={`option-btn ${testConfig.mode === mode.id ? 'active' : ''}`}
                                    onClick={() => handleModeChange(mode.id)}
                                >
                                    {mode.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={{minHeight: '2.5rem', color: '#94a3b8', fontSize: '0.9rem', marginTop: '1rem'}}>
                        {description}
                    </div>

                    <button className="start-test-btn" onClick={startTest}>Start Test ⚡</button>
                </div>
            </div>
        </div>
    );
};

export default Setup;
