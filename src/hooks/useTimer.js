import { useState, useEffect, useCallback, useRef } from 'react';

const useTimer = (initialTime = 0, countDown = false) => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const timerRef = useRef(null);

  const start = useCallback(() => {
    if (!isRunning && !isFinished) {
      setIsRunning(true);
    }
  }, [isRunning, isFinished]);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback((newTime = initialTime) => {
    setIsRunning(false);
    setIsFinished(false);
    setTime(newTime);
    if (timerRef.current) clearInterval(timerRef.current);
  }, [initialTime]);

  useEffect(() => {
    if (isRunning && !isFinished) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (countDown) {
            if (prevTime <= 1) {
              clearInterval(timerRef.current);
              setIsRunning(false);
              setIsFinished(true);
              return 0;
            }
            return prevTime - 1;
          } else {
            return prevTime + 1;
          }
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning, isFinished, countDown]);

  return { time, isRunning, isFinished, start, pause, reset, setTime };
};

export default useTimer;
