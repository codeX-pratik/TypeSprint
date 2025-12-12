import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useResult } from '../context/ResultContext';

const Container = styled.div`
  flex: 1;
  width: 100%;
  min-height: 100%; 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  animation: fadeIn 0.5s ease-out;

  @media (min-width: 768px) {
    padding: 2rem;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 0.5rem;
  font-weight: 800;
  line-height: 1.1;
  
  span {
      color: ${({ theme }) => theme.text};
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  max-width: 1100px;
  align-items: stretch; /* Ensure same height */
  
  @media (min-width: 900px) {
    flex-direction: row;
    align-items: stretch; 
  }
`;

const InstructionsPanel = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.card}95;
  backdrop-filter: blur(20px);
  padding: 2.5rem;
  border-radius: 24px;
  border: 1px solid ${({ theme }) => theme.primary}30; /* Subtle colored border */
  box-shadow: 0 10px 30px -10px ${({ theme }) => theme.shadow};
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  text-align: left;
  
  h2 {
      margin: 0;
      color: ${({ theme }) => theme.primary};
      font-size: 1.8rem;
  }
  
  ul {
      padding-left: 1.2rem;
      color: ${({ theme }) => theme.textSecondary};
      line-height: 1.8;
  }
  
  li {
      margin-bottom: 0.5rem;
  }
  
  .tip {
      margin-top: auto; /* Push to bottom */
      padding: 1rem;
      background: ${({ theme }) => theme.primary}10;
      border-radius: 12px;
      font-size: 0.9rem;
      color: ${({ theme }) => theme.text};
      border-left: 4px solid ${({ theme }) => theme.primary};
  }
`;

const ConfigSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background: ${({ theme }) => theme.card}95; /* More opaque for better contrast */
  backdrop-filter: blur(20px);
  padding: 3rem;
  border-radius: 24px;
  box-shadow: 0 20px 40px -10px ${({ theme }) => theme.shadow};
  width: 100%;
  /* max-width: 600px; Remove fixed max width in split view */
  flex: 1; /* Allow to grow in flex container */
  border: 1px solid ${({ theme }) => theme.border};

  @media (max-width: 768px) {
      padding: 1.5rem;
      gap: 1.5rem;
  }
`;

const ConfigGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: center;
  width: 100%;
`;

const Label = styled.label`
  font-weight: 600;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 0.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  width: 100%;
  flex-wrap: wrap; /* Allow wrapping on very small screens */
`;

const OptionButton = styled.button`
  flex: 1;
  min-width: 80px;
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme, $active }) => $active ? theme.primary : theme.border};
  background: ${({ theme, $active }) => $active ? theme.primary : 'transparent'}; 
  color: ${({ theme, $active }) => $active ? '#ffffff' : theme.text}; /* White text on active */
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 600;
  font-size: 0.95rem;

  &:hover {
    border-color: ${({ theme }) => theme.primary};
    background: ${({ theme, $active }) => $active ? theme.primaryHover : theme.secondary + '40'};
    transform: translateY(-1px);
  }
  
  &:active {
      transform: translateY(0);
  }
`;

const CustomInput = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.border};
  background: transparent;
  color: ${({ theme }) => theme.text};
  border-radius: 12px;
  max-width: 100px;
  text-align: center;
  font-weight: 600;
  font-size: 0.95rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primary}40;
  }
`;

const StartButton = styled.button`
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  padding: 1.2rem 2rem; /* Larger Click Area */
  font-size: 1.2rem;
  font-weight: 700;
  border-radius: 16px;
  cursor: pointer;
  width: 100%;
  margin-top: 1rem;
  box-shadow: 0 10px 20px -10px ${({ theme }) => theme.primary};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: ${({ theme }) => theme.primaryHover};
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 20px 25px -5px ${({ theme }) => theme.primary}50;
  }
  
  &:active {
    transform: translateY(-1px) scale(0.98);
  }
`;

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
        <Container>
            <div style={{marginBottom: '2rem'}}>
                <Title>Configure <span>Test</span></Title>
            </div>

            <ContentWrapper>
                <InstructionsPanel>
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
                </InstructionsPanel>

                <ConfigSection>
                    <ConfigGroup>
                        <Label>Time (Seconds)</Label>
                        <ButtonGroup>
                            {[60, 90, 120].map(sec => (
                                <OptionButton 
                                    key={sec} 
                                    $active={testConfig.duration === sec}
                                    onClick={() => handleDurationChange(sec)}
                                >
                                    {sec}s
                                </OptionButton>
                            ))}
                            <CustomInput 
                                type="number" 
                                min="10" 
                                max="600"
                                placeholder="Custom"
                                value={testConfig.duration}
                                onChange={(e) => handleDurationChange(e.target.value)}
                            />
                        </ButtonGroup>
                    </ConfigGroup>

                    <ConfigGroup>
                        <Label>Difficulty</Label>
                        <ButtonGroup>
                            {['easy', 'medium', 'hard'].map(diff => (
                                <OptionButton 
                                    key={diff} 
                                    $active={testConfig.difficulty === diff}
                                    onClick={() => handleDifficultyChange(diff)}
                                    style={{textTransform: 'capitalize'}}
                                >
                                    {diff === 'easy' && '🌱 '}
                                    {diff === 'medium' && '⚖️ '}
                                    {diff === 'hard' && '🔥 '}
                                    {diff}
                                </OptionButton>
                            ))}
                        </ButtonGroup>
                    </ConfigGroup>
                    
                     <ConfigGroup>
                        <Label>Mode</Label>
                        <ButtonGroup>
                            {[
                                {id: 'test', label: 'Test Mode'},
                                {id: 'practice', label: 'Practice'}
                            ].map(mode => (
                                <OptionButton 
                                    key={mode.id} 
                                    $active={testConfig.mode === mode.id}
                                    onClick={() => handleModeChange(mode.id)}
                                >
                                    {mode.label}
                                </OptionButton>
                            ))}
                        </ButtonGroup>
                    </ConfigGroup>

                    <div style={{minHeight: '2.5rem', color: '#94a3b8', fontSize: '0.9rem', marginTop: '1rem'}}>
                        {description}
                    </div>

                    <StartButton onClick={startTest}>Start Test ⚡</StartButton>
                </ConfigSection>
            </ContentWrapper>
        </Container>
    );
};

export default Setup;
