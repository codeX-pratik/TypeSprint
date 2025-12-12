import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useResult } from '../context/ResultContext';
import useTimer from '../hooks/useTimer';
import withConfigCheck from '../hoc/withConfigCheck';
import withErrorBoundary from '../hoc/withErrorBoundary';
import withLoading from '../hoc/withLoading';
import { getParagraph, calculateWPM, calculateAccuracy, formatTime } from '../utils/helpers';
import { generateParagraphWithAI } from '../utils/gemini';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 900px;
  width: 100%;
  flex: 1;
  margin: 0 auto;
  padding: 1rem;
  gap: 1.5rem;
  
  @media (min-width: 768px) {
    padding: 2rem;
    gap: 2rem;
    justify-content: center;
  }
`;

const StatsBar = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 1rem;
  background: ${({ theme }) => theme.card};
  border-bottom: 2px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 1rem; 
  color: ${({ theme }) => theme.primary};
  transition: all 0.3s ease;
  
  @media (min-width: 768px) {
      padding: 1.25rem 3rem;
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;

  span:first-child {
    font-size: 0.7rem;
    color: ${({ theme }) => theme.textSecondary};
    text-transform: uppercase;
  }
  
  @media (min-width: 768px) {
      span:first-child {
          font-size: 0.8rem;
      }
  }
`;

const TypingArea = styled.div`
  position: relative;
  width: 100%;
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.1rem;
  line-height: 1.6;
  background: ${({ theme }) => theme.background};
  padding: 1rem;
  border-radius: 8px;
  min-height: 15rem;
  cursor: text;
  word-spacing: 0.2rem;
  user-select: none;
  overflow-y: auto;
  max-height: 60vh;
  border: 1px solid transparent; 
  transition: all 0.3s ease;
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.05);
  
  &:focus-within {
      outline: none;
      box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}40, inset 0 2px 4px 0 rgba(0, 0, 0, 0.05);
      border-color: ${({ theme }) => theme.primary};
  }

  @media (min-width: 768px) {
    font-size: 1.8rem;
    padding: 2rem;
    line-height: 1.8;
  }
`;

const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: default;
`;

const Char = styled.span`
  color: ${({ status, theme }) => {
    if (status === 'correct') return theme.accent;
    if (status === 'incorrect') return theme.error;
    return theme.textSecondary;
  }};
  background: ${({ status, theme }) => status === 'incorrect' ? theme.error + '20' : 'transparent'};
  border-radius: 2px;
  
  &.current {
    border-left: 2px solid ${({ theme }) => theme.primary};
    animation: blink 1s infinite;
  }
  
  @keyframes blink {
    0%, 100% { border-color: transparent }
    50% { border-color: ${({ theme }) => theme.primary} }
  }
`;

// -- PRESENTATIONAL COMPONENT --
const TestView = ({ 
    paragraph, 
    typed, 
    time, 
    currentWPM, 
    currentAccuracy, 
    handleInput, 
    handleKeyDown, 
    handleClick, 
    inputRef, 
    isThinking 
}) => {
    return (
        <Container onClick={handleClick}>
            <StatsBar>
                <StatItem>
                    <span>Time</span>
                    {formatTime(time)}
                </StatItem>
                <StatItem>
                    <span>WPM</span>
                    {currentWPM}
                </StatItem>
                <StatItem>
                    <span>Accuracy</span>
                    {currentAccuracy}%
                </StatItem>
            </StatsBar>

            <TypingArea onClick={handleClick}>
                {paragraph.split('').map((char, index) => {
                    let status = 'untyped';
                    if (index < typed.length) {
                        status = typed[index] === char ? 'correct' : 'incorrect';
                    }
                    const isCurrent = index === typed.length;
                    return (
                        <Char key={index} status={status} className={isCurrent ? 'current' : ''}>
                            {char}
                        </Char>
                    );
                })}
                <HiddenInput 
                    ref={inputRef}
                    type="text"
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                    value={typed}
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    onPaste={(e) => e.preventDefault()}
                    disabled={isThinking}
                />
            </TypingArea>

            <p style={{color: '#6c757d', fontSize: '0.9rem'}}>
                Click text to focus • Press ESC to reset (refresh)
            </p>
        </Container>
    );
};

// Wrap View with Loading logic
const TestViewWithLoading = withLoading(TestView);

// -- LOGIC CONTAINER --
const TestContainer = () => {
    const { testConfig, setResult } = useResult();
    const navigate = useNavigate();
    
    const [paragraph, setParagraph] = useState('');
    const [typed, setTyped] = useState('');
    const [mistakes, setMistakes] = useState(0);
    const [isThinking, setIsThinking] = useState(true);

    const isPractice = testConfig.mode === 'practice';
    const { time, isRunning, isFinished, start, pause, reset } = useTimer(
        isPractice ? 0 : testConfig.duration, 
        !isPractice
    );
    
    const inputRef = useRef(null);
    const [isLoadingAI, setIsLoadingAI] = useState(false);

    // Initialize Test
    useEffect(() => {
        const initTest = async () => {
             setTyped('');
             setMistakes(0);
             setIsThinking(true);
             setIsLoadingAI(true);
             
             // Try AI first
             let text = await generateParagraphWithAI(testConfig.difficulty);
             
             // Fallback
             if (!text) {
                 text = getParagraph(testConfig.difficulty);
             }
             
             setParagraph(text);
             setIsLoadingAI(false);
             setIsThinking(false);
             reset(isPractice ? 0 : testConfig.duration);
             
             // Slight delay to focus to ensure rendering
             setTimeout(() => {
                 if(inputRef.current) inputRef.current.focus();
             }, 100);
        };

        initTest();
    }, [testConfig, reset, isPractice]);

    // Handle Time Finish
    useEffect(() => {
        if (isFinished && !isPractice) {
            finishTest();
        }
    }, [isFinished, isPractice]);

    const finishTest = useCallback(() => {
        let timeTaken = isPractice ? time : (testConfig.duration - time);
        if (timeTaken === 0) timeTaken = 1;

        const correctChars = typed.split('').filter((char, i) => char === paragraph[i]).length;
        const wpm = calculateWPM(correctChars, timeTaken);
        const accuracy = calculateAccuracy(typed.length, mistakes);

        setResult({
            wpm,
            accuracy,
            mistakes,
            totalChars: typed.length,
            timeTaken,
            date: new Date().toISOString(),
            mode: testConfig.mode
        });
        
        navigate('/result');
    }, [typed, mistakes, time, testConfig, isPractice, setResult, navigate, paragraph]);

    const handleInput = (e) => {
        const value = e.target.value;
        if (isFinished || isThinking) return;

        if (!isRunning && value.length === 1 && typed.length === 0) {
            start();
        }

        if (value.length > typed.length) {
            const newCharIndex = value.length - 1;
            const newChar = value[newCharIndex];
            if (newCharIndex < paragraph.length) {
                if (newChar !== paragraph[newCharIndex]) {
                    setMistakes(prev => prev + 1);
                }
            }
        } 
        
        setTyped(value);

        if (value.length >= paragraph.length) {
            setTyped(value.slice(0, paragraph.length));
            finishTest();
        }
    };

    const handleKeyDown = (e) => {};

    const handleClick = () => {
        if(inputRef.current) inputRef.current.focus();
    };

    const currentCorrect = typed.split('').filter((c, i) => c === paragraph[i]).length;
    const currentWPM = calculateWPM(currentCorrect, isPractice ? time : (testConfig.duration - time));
    const currentAccuracy = calculateAccuracy(typed.length, mistakes);

    return (
        <TestViewWithLoading 
            isLoading={isLoadingAI}
            loadingMessage="Generating AI challenge..."
            paragraph={paragraph}
            typed={typed}
            time={time}
            currentWPM={currentWPM}
            currentAccuracy={currentAccuracy}
            handleInput={handleInput}
            handleKeyDown={handleKeyDown}
            handleClick={handleClick}
            inputRef={inputRef}
            isThinking={isThinking}
        />
    );
};

// Wrap with Configuration Check AND Error Boundary
export default withConfigCheck(withErrorBoundary(TestContainer));
