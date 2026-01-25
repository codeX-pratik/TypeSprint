import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <p>
                © {new Date().getFullYear()} TypeSprint. Built for speed.
            </p>
        </footer>
    );
};

export default Footer;
