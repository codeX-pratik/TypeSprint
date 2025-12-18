import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <div className="hero-section">
                <div>
                    <h1 className="home-title">Type<span>Sprint</span></h1>
                    <p className="home-subtitle">
                        The ultimate platform to master your typing speed. 
                        Test yourself against AI-generated challenges and track your progress.
                    </p>
                </div>
                
                <button className="get-started-btn" onClick={() => navigate('/setup')}>
                    Get Started <span>→</span>
                </button>
            </div>

            <div className="features-grid">
                <div className="feature-card">
                    <div className="feature-icon">🤖</div>
                    <h3 className="feature-title">AI Powered</h3>
                    <p className="feature-desc">
                        Never type the same text twice. Our Gemini AI integration generates unique, context-aware paragraphs for every test session.
                    </p>
                </div>

                <div className="feature-card">
                    <div className="feature-icon">⚡</div>
                    <h3 className="feature-title">Real-time Analytics</h3>
                    <p className="feature-desc">
                        Track your WPM, accuracy, and error rates instantly. Get detailed feedback to understand your strengths and weaknesses.
                    </p>
                </div>

                <div className="feature-card">
                    <div className="feature-icon">📈</div>
                    <h3 className="feature-title">Track Progress</h3>
                    <p className="feature-desc">
                        Keep a history of your best runs. Analyze your improvement over time with our local scoring system.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Home;
