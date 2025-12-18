import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const NavBar = () => {
    const { themeMode, toggleTheme } = useTheme();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    
    const closeMenu = () => setIsOpen(false);

    return (
        <nav className="navbar">
            <Link to="/" className="logo" onClick={closeMenu}>⚡ TypeSprint</Link>
            
            <button className="hamburger" onClick={() => setIsOpen(!isOpen)} aria-label="Menu">
                {isOpen ? '✕' : '☰'}
            </button>

            <div className={`nav-links ${isOpen ? 'open' : ''}`}>
                <Link 
                    to="/" 
                    className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} 
                    onClick={closeMenu}
                >
                    Home
                </Link>
                <Link 
                    to="/leaderboard" 
                    className={`nav-link ${location.pathname === '/leaderboard' ? 'active' : ''}`} 
                    onClick={closeMenu}
                >
                    Leaderboard
                </Link>
                <button className="toggle-button" onClick={() => { toggleTheme(); closeMenu(); }} aria-label="Toggle Theme">
                    {themeMode === 'light' ? '🌙' : '☀️'}
                </button>
            </div>
        </nav>
    )
}

export default NavBar;
