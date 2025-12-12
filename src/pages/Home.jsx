import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  min-height: 100%; 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4rem; /* Increased gap for sections */
  text-align: center;
  padding: 4rem 2rem;
  animation: fadeIn 0.8s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const HeroSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const Title = styled.h1`
  font-size: 5rem;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 0.5rem;
  font-weight: 900;
  letter-spacing: -2px;
  line-height: 1.1;
  
  span {
      color: ${({ theme }) => theme.text};
  }

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 1.5rem;
  max-width: 700px;
  line-height: 1.6;
  
  @media (max-width: 768px) {
      font-size: 1.1rem;
  }
`;

const GetStartedButton = styled.button`
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  padding: 1.2rem 3rem;
  font-size: 1.25rem;
  font-weight: 700;
  border-radius: 99px;
  cursor: pointer;
  box-shadow: 0 10px 30px -5px ${({ theme }) => theme.primary};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;

  &:hover {
    background: ${({ theme }) => theme.primaryHover};
    transform: translateY(-4px) scale(1.05);
    box-shadow: 0 20px 40px -5px ${({ theme }) => theme.primary}60;
  }
  
  &:active {
    transform: translateY(-1px) scale(0.98);
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  margin-top: 2rem;
`;

const FeatureCard = styled.div`
  background: ${({ theme }) => theme.card}40;
  backdrop-filter: blur(10px);
  border: 1px solid ${({ theme }) => theme.border};
  padding: 2.5rem;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  gap: 1rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: ${({ theme }) => theme.card}80;
    border-color: ${({ theme }) => theme.primary}40;
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.text};
  font-weight: 700;
`;

const FeatureDesc = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.6;
  font-size: 1.1rem;
`;

const Home = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <HeroSection>
                <div>
                    <Title>Type<span>Sprint</span></Title>
                    <Subtitle>
                        The ultimate platform to master your typing speed. 
                        Test yourself against AI-generated challenges and track your progress.
                    </Subtitle>
                </div>
                
                <GetStartedButton onClick={() => navigate('/setup')}>
                    Get Started <span>→</span>
                </GetStartedButton>
            </HeroSection>

            <FeaturesGrid>
                <FeatureCard>
                    <FeatureIcon>🤖</FeatureIcon>
                    <FeatureTitle>AI Powered</FeatureTitle>
                    <FeatureDesc>
                        Never type the same text twice. Our Gemini AI integration generates unique, context-aware paragraphs for every test session.
                    </FeatureDesc>
                </FeatureCard>

                <FeatureCard>
                    <FeatureIcon>⚡</FeatureIcon>
                    <FeatureTitle>Real-time Analytics</FeatureTitle>
                    <FeatureDesc>
                        Track your WPM, accuracy, and error rates instantly. Get detailed feedback to understand your strengths and weaknesses.
                    </FeatureDesc>
                </FeatureCard>

                <FeatureCard>
                    <FeatureIcon>📈</FeatureIcon>
                    <FeatureTitle>Track Progress</FeatureTitle>
                    <FeatureDesc>
                        Keep a history of your best runs. Analyze your improvement over time with our local scoring system.
                    </FeatureDesc>
                </FeatureCard>
            </FeaturesGrid>
        </Container>
    );
};

export default Home;
