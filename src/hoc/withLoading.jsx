import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  gap: 1.5rem;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid ${({ theme }) => theme.primary}30;
  border-top: 4px solid ${({ theme }) => theme.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  font-weight: 500;
  font-size: 1.1rem;
  letter-spacing: 0.5px;
  animation: pulse 1.5s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
  }
`;

const withLoading = (WrappedComponent) => {
  return function WithLoadingComponent({ isLoading, loadingMessage, ...props }) {
    if (isLoading) {
      return (
        <LoaderWrapper>
          <Spinner />
          <LoadingText>{loadingMessage || "Preparing your test..."}</LoadingText>
        </LoaderWrapper>
      );
    }
    return <WrappedComponent {...props} />;
  };
};

export default withLoading;
