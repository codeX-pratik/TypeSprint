import React from 'react';
import styled from 'styled-components';
import useLocalStorage from '../hooks/useLocalStorage';
import { formatTime } from '../utils/helpers';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 1rem;
`;

const Headers = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.primary};
  margin: 0;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: ${({ theme }) => theme.card};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  min-width: 600px; /* Force scroll on small screens */
`;

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  border-radius: 12px;
  -webkit-overflow-scrolling: touch;
`;

const Th = styled.th`
  text-align: left;
  padding: 1rem;
  background: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.textSecondary};
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.85rem;
`;

const Tr = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.border};
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background: ${({ theme }) => theme.background};
  }
`;

const Td = styled.td`
  padding: 1rem;
  color: ${({ theme }) => theme.text};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 1.2rem;
`;

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useLocalStorage('leaderboard', []);

    const clearHistory = () => {
        if (window.confirm('Are you sure you want to clear your typing history? This cannot be undone.')) {
            setLeaderboard([]);
        }
    };

    return (
        <Container>
            <Headers>
                <Title>Leaderboard</Title>
                {leaderboard.length > 0 && (
                    <button 
                        onClick={clearHistory}
                        style={{
                            background: 'transparent',
                            border: '1px solid #ef4444',
                            color: '#ef4444',
                            padding: '0.5rem 1rem',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            transition: 'all 0.2s'
                        }}
                    >
                        Clear History
                    </button>
                )}
            </Headers>

            {leaderboard.length === 0 ? (
                <EmptyState>No tests taken yet. Start typing!</EmptyState>
            ) : (
                <TableWrapper>
                <Table>
                    <thead>
                        <tr>
                            <Th>Date</Th>
                            <Th>WPM</Th>
                            <Th>Accuracy</Th>
                            <Th>Mode</Th>
                            <Th>Duration</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboard.map((entry, index) => (
                            <Tr key={index}>
                                <Td>{new Date(entry.date).toLocaleDateString()}</Td>
                                <Td style={{fontWeight: 'bold', color: '#10b981'}}>{entry.wpm}</Td>
                                <Td>{entry.accuracy}%</Td>
                                <Td>{entry.config.mode === 'practice' ? 'Practice' : entry.config.difficulty}</Td>
                                <Td>{entry.config.duration}s</Td>
                            </Tr>
                        ))}
                    </tbody>
                </Table>
                </TableWrapper>
            )}
        </Container>
    );
};

export default Leaderboard;
