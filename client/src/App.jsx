import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ResultProvider } from './context/ResultContext';
import { ThemeProvider } from './context/ThemeContext';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Setup from './pages/Setup';
import Test from './pages/Test';
import Result from './pages/Result';
import Leaderboard from './pages/Leaderboard';

function App() {
  return (
    <ResultProvider>
      <ThemeProvider>
        <div className="app-wrapper">
          <Router>
              <NavBar />
              <main className="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/setup" element={<Setup />} />
                    <Route path="/test" element={<Test />} />
                    <Route path="/result" element={<Result />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
              <Footer />
          </Router>
        </div>
      </ThemeProvider>
    </ResultProvider>
  );
}

export default App;
