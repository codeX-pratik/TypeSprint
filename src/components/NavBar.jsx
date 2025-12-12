import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 5%;
  background: ${({ theme }) => theme.card}cc; /* 80% opacity */
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid ${({ theme }) => theme.border};
  position: sticky; /* Sticky nav */
  top: 0;
  z-index: 1000;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 800;
  color: ${({ theme }) => theme.primary};
  letter-spacing: -1px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  z-index: 1001;

  &:hover {
    color: ${({ theme }) => theme.primaryHover};
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;

  @media (max-width: 768px) {
    display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: ${({ theme }) => theme.card};
    padding: 2rem;
    border-bottom: 1px solid ${({ theme }) => theme.border};
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
`;

const NavLink = styled(Link)`
  font-weight: 500;
  color: ${({ theme, $active }) => $active ? theme.primary : theme.textSecondary};
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.primary}15; /* Subtle background highlight */
    padding: 0.5rem 1rem;
    border-radius: 8px;
    margin: -0.5rem -1rem; /* Counteract padding to keep layout stable?? No, let's just animate bg */
    margin: 0;
    padding: 0;
    background: transparent;
  }
  
  /* Better Hover Effect */
  position: relative;
  &::after {
      content: '';
      position: absolute;
      width: 0%;
      height: 2px;
      bottom: -4px;
      left: 0;
      background-color: ${({ theme }) => theme.primary};
      transition: width 0.3s ease;
  }
  
  &:hover::after {
      width: 100%;
  }
`;

const ToggleButton = styled.button`
  background: ${({ theme }) => theme.secondary}40;
  border: 1px solid transparent;
  color: ${({ theme }) => theme.text};
  padding: 0;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  font-size: 1.2rem;

  &:hover {
    background: ${({ theme }) => theme.secondary};
    transform: rotate(15deg);
  }
`;

const Hamburger = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 1001;

  @media (max-width: 768px) {
    display: block;
  }
`;

const NavBar = () => {
    const { themeMode, toggleTheme } = useTheme();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    
    const closeMenu = () => setIsOpen(false);

    return (
        <Nav>
            <Logo to="/" onClick={closeMenu}>⚡ TypeSprint</Logo>
            
            <Hamburger onClick={() => setIsOpen(!isOpen)} aria-label="Menu">
                {isOpen ? '✕' : '☰'}
            </Hamburger>

            <NavLinks $isOpen={isOpen}>
                <NavLink to="/" $active={location.pathname === '/'} onClick={closeMenu}>Home</NavLink>
                <NavLink to="/leaderboard" $active={location.pathname === '/leaderboard'} onClick={closeMenu}>Leaderboard</NavLink>
                <ToggleButton onClick={() => { toggleTheme(); closeMenu(); }} aria-label="Toggle Theme">
                    {themeMode === 'light' ? '🌙' : '☀️'}
                </ToggleButton>
            </NavLinks>
        </Nav>
    )
}

export default NavBar;
