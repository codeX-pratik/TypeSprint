import React from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  background: ${({ theme }) => theme.card}90;
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.primary}40;
  max-width: 500px;
  margin: 2rem auto;
  text-align: center;
  box-shadow: 0 10px 40px -10px ${({ theme }) => theme.shadow};
`;

const ErrorTitle = styled.h2`
  color: #ef4444;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 2rem;
`;

const RetryButton = styled.button`
  padding: 0.8rem 2rem;
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const withErrorBoundary = (WrappedComponent) => {
  return class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
      return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
      console.error("ErrorBoundary caught an error", error, errorInfo);
    }

    handleRetry = () => {
        // Simple reload or reset state
        window.location.href = '/'; 
    }

    render() {
      if (this.state.hasError) {
        return (
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh'}}>
              <ErrorContainer>
                <ErrorTitle>Oops! 😵</ErrorTitle>
                <ErrorMessage>
                  Something went wrong while loading this component.
                </ErrorMessage>
                <RetryButton onClick={this.handleRetry}>Return Home</RetryButton>
              </ErrorContainer>
          </div>
        );
      }

      return <WrappedComponent {...this.props} />;
    }
  };
};

export default withErrorBoundary;
