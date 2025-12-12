import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useResult } from '../context/ResultContext';
import withProtection from '../hoc/withProtection';
import useLocalStorage from '../hooks/useLocalStorage';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  gap: 2rem;
  padding: 2rem;
  animation: slideUp 0.5s ease-out;

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const ScoreCard = styled.div`
  background: ${({ theme }) => theme.card};
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  width: 100%;
  max-width: 600px;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.border};

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    padding: 2rem;
  }
`;

const MainStat = styled.div`
  grid-column: span 2;
  margin-bottom: 1rem;
`;

const StatValue = styled.h2`
  font-size: 5rem;
  color: ${({ theme }) => theme.primary};
  line-height: 1;
  margin: 0;
  font-weight: 800;
  
  @media (max-width: 600px) {
      font-size: 3.5rem;
  }
`;

const StatLabel = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.textSecondary};
  margin: 0.5rem 0 0 0;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const SecondaryStat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ValueSmall = styled.h3`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.text};
  margin: 0;
`;

const LabelSmall = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textSecondary};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.8rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${({ $primary, theme }) => $primary ? `
    background: ${theme.primary};
    color: white;
    &:hover { background: ${theme.primaryHover}; transform: translateY(-2px); }
  ` : `
    background: ${theme.secondary};
    color: ${theme.text};
    &:hover { background: ${theme.border}; }
  `}
`;

const Result = () => {
    const { result, testConfig } = useResult();
    const navigate = useNavigate();
    const [leaderboard, setLeaderboard] = useLocalStorage('leaderboard', []);
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
        }
    }, [result, testConfig, setLeaderboard]);

    if (!result) return null; // Should be handled by HOC

    return (
        <Container>
            <ScoreCard>
                <MainStat>
                    <StatValue>{result.wpm}</StatValue>
                    <StatLabel>WPM</StatLabel>
                </MainStat>
                
                <SecondaryStat>
                    <ValueSmall>{result.accuracy}%</ValueSmall>
                    <LabelSmall>Accuracy</LabelSmall>
                </SecondaryStat>

                <SecondaryStat>
                    <ValueSmall>{result.mistakes}</ValueSmall>
                    <LabelSmall>Mistakes</LabelSmall>
                </SecondaryStat>
                
                <SecondaryStat>
                    <ValueSmall>{result.totalChars}</ValueSmall>
                    <LabelSmall>Characters</LabelSmall>
                </SecondaryStat>

                <SecondaryStat>
                    <ValueSmall>{result.timeTaken}s</ValueSmall>
                    <LabelSmall>Time</LabelSmall>
                </SecondaryStat>
            </ScoreCard>

            <ButtonGroup>
                <Button $primary onClick={() => navigate('/test')}>Try Again</Button>
                <Button onClick={() => navigate('/')}>Back to Home</Button>
            </ButtonGroup>
        </Container>
    );
};

export default withProtection(Result);
