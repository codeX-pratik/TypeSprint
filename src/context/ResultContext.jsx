import React, { createContext, useContext, useState } from 'react';

const ResultContext = createContext(null);

export const ResultProvider = ({ children }) => {
  const [result, setResult] = useState(null); 
  // result object structure: { wpm, accuracy, mistakes, totalChars, timeTaken, date }
  
  const [testConfig, setTestConfig] = useState({
      duration: 60,
      difficulty: 'medium', 
      mode: 'test' // 'test' | 'practice'
  });

  return (
    <ResultContext.Provider value={{ result, setResult, testConfig, setTestConfig }}>
      {children}
    </ResultContext.Provider>
  );
};

export const useResult = () => {
    const context = useContext(ResultContext);
    if (!context) {
        throw new Error("useResult must be used within a ResultProvider");
    }
    return context;
};
