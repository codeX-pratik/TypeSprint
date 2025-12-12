import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

  html, body, #root {
    min-height: 100vh;
    margin: 0;
    padding: 0;
  }

  body {
    background: ${({ theme }) => theme.background};
    background-image: 
        radial-gradient(circle at 15% 50%, ${({ theme }) => theme.primary}15 0%, transparent 25%), 
        radial-gradient(circle at 85% 30%, ${({ theme }) => theme.accent}15 0%, transparent 25%);
    background-attachment: fixed;
    color: ${({ theme }) => theme.text};
    font-family: 'Inter', sans-serif;
    transition: background 0.3s ease, color 0.3s ease;
    box-sizing: border-box;
    overflow-x: hidden;
  }
  
  * {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    font-family: 'Inter', sans-serif;
  }
  
  code, pre, .mono {
    font-family: 'JetBrains Mono', monospace;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.background};
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.secondary};
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.primary};
  }
`;
