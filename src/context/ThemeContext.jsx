import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import useLocalStorage from '../hooks/useLocalStorage';

const ThemeContext = createContext();

// Modern, premium palettes
const lightTheme = {
  background: '#f8fafc', // Slate-50
  card: '#ffffff',
  text: '#0f172a', // Slate-900
  textSecondary: '#64748b', // Slate-500
  primary: '#6366f1', // Indigo-500
  primaryHover: '#4f46e5', // Indigo-600
  secondary: '#e2e8f0', // Slate-200
  accent: '#10b981', // Emerald-500
  error: '#ef4444', // Red-500
  border: '#e2e8f0', // Slate-200
  shadow: 'rgba(148, 163, 184, 0.1)',
};

const darkTheme = {
  background: '#0f172a', // Slate-900
  card: '#1e293b', // Slate-800
  text: '#f1f5f9', // Slate-100
  textSecondary: '#94a3b8', // Slate-400
  primary: '#818cf8', // Indigo-400
  primaryHover: '#6366f1', // Indigo-500
  secondary: '#334155', // Slate-700
  accent: '#34d399', // Emerald-400
  error: '#f87171', // Red-400
  border: '#334155', // Slate-700
  shadow: 'rgba(0, 0, 0, 0.3)',
};

export const ThemeProvider = ({ children }) => {
    const [themeMode, setThemeMode] = useLocalStorage('theme', 'dark'); // Default to dark for "pro" feel
    const [mounted, setMounted] = useState(false);

    const toggleTheme = () => {
        setThemeMode(prev => prev === 'light' ? 'dark' : 'light');
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    const theme = themeMode === 'light' ? lightTheme : darkTheme;

    return (
        <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
            <StyledThemeProvider theme={theme}>
                {children}
            </StyledThemeProvider>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
