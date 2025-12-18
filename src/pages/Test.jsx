import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResult } from '../context/ResultContext';
import useTimer from '../hooks/useTimer';
import withConfigCheck from '../hoc/withConfigCheck.jsx';
import withErrorBoundary from '../hoc/withErrorBoundary.jsx';
import withLoading from '../hoc/withLoading.jsx';
import { getParagraph, calculateWPM, calculateAccuracy, formatTime } from '../utils/helpers';
import { generateParagraphWithAI } from '../utils/gemini';

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
        <div className="test-container" onClick={handleClick}>
            <div className="stats-bar">
                <div className="stat-item">
                    <span>Time</span>
                    {formatTime(time)}
                </div>
                <div className="stat-item">
                    <span>WPM</span>
                    {currentWPM}
                </div>
                <div className="stat-item">
                    <span>Accuracy</span>
                    {currentAccuracy}%
                </div>
            </div>

            <div className="typing-area" onClick={handleClick}>
                {paragraph.split('').map((char, index) => {
                    let status = 'untyped';
                    if (index < typed.length) {
                        status = typed[index] === char ? 'correct' : 'incorrect';
                    }
                    const isCurrent = index === typed.length;
                    return (
                        <span key={index} className={`char ${status} ${isCurrent ? 'current' : ''}`}>
                            {char}
                        </span>
                    );
                })}
                <input 
                    className="hidden-input"
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
            </div>

            <p style={{color: '#6c757d', fontSize: '0.9rem'}}>
                Click text to focus • Press ESC to reset (refresh)
            </p>
        </div>
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
    const { time, isRunning, isFinished, start, reset } = useTimer(
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

    const finishTest = useCallback((finalTyped = typed) => {
        let timeTaken = isPractice ? time : (testConfig.duration - time);
        if (timeTaken === 0) timeTaken = 1;

        // Use finalTyped if provided (for last char update), else state typed
        const textToAnalyze = finalTyped || typed;

        const correctChars = textToAnalyze.split('').filter((char, i) => char === paragraph[i]).length;
        const wpm = calculateWPM(correctChars, timeTaken);
        const accuracy = calculateAccuracy(textToAnalyze.length, mistakes);

        setResult({
            wpm,
            accuracy,
            mistakes,
            totalChars: textToAnalyze.length,
            timeTaken,
            date: new Date().toISOString(),
            mode: testConfig.mode
        });
        
        navigate('/result');
    }, [typed, mistakes, time, testConfig, isPractice, setResult, navigate, paragraph]);

    // Handle Time Finish
    useEffect(() => {
        if (isFinished && !isPractice) {
            finishTest();
        }
    }, [isFinished, isPractice, finishTest]);

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
            const finalValue = value.slice(0, paragraph.length);
            setTyped(finalValue);
            finishTest(finalValue);
        }
    };

    const handleKeyDown = () => {};

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

// Wrap with Error Boundary (Outer) AND Configuration Check (Inner)
const TestPage = withErrorBoundary(withConfigCheck(TestContainer));

export default TestPage;
