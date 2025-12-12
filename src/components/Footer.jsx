import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  width: 100%;
  padding: 1.5rem;
  text-align: center;
  margin-top: auto; /* Push to bottom */
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.9rem;
  border-top: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.card}80;
  backdrop-filter: blur(5px);
`;

const Link = styled.a`
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
  font-weight: 500;
  margin: 0 0.5rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Footer = () => {
    return (
        <FooterContainer>
            <p>
                © {new Date().getFullYear()} TypeSprint. Built for speed.
            </p>
        </FooterContainer>
    );
};

export default Footer;
