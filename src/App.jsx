import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ResultProvider } from './context/ResultContext';
import { ThemeProvider } from './context/ThemeContext';
import { GlobalStyles } from './components/GlobalStyles';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Setup from './pages/Setup';
import Test from './pages/Test';
import Result from './pages/Result';
import Leaderboard from './pages/Leaderboard';

// New Layout Components
import styled from 'styled-components';

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100vw;
  max-width: 100%;
  align-items: center; /* Force center all pages */
  overflow-x: hidden;
`;

function App() {
  return (
    <ResultProvider>
      <ThemeProvider>
        <GlobalStyles />
        <AppWrapper>
          <Router>
              <NavBar />
              <MainContent>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/setup" element={<Setup />} />
                    <Route path="/test" element={<Test />} />
                    <Route path="/result" element={<Result />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </MainContent>
              <Footer />
          </Router>
        </AppWrapper>
      </ThemeProvider>
    </ResultProvider>
  );
}

export default App;
