import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PlayerPlaytimes from '../../src/features/GameSummary/components/PlayerPlaytimes';

describe('PlayerPlaytimes Component', () => {
  const mockPlayers = [
    { id: '1', name: 'John Doe', position: 'forward', status: 'active', minutesPlayed: 90 },
    { id: '2', name: 'Jane Smith', position: 'midfielder', status: 'active', minutesPlayed: 45 },
    { id: '3', name: 'Bob Johnson', position: 'defender', status: 'active', minutesPlayed: 15 }
  ];

  it('renders the player playtimes component with title', () => {
    render(<PlayerPlaytimes activePlayers={mockPlayers} benchPlayers={[]} />);
    
    expect(screen.getByText(/Player Play Times/i)).toBeInTheDocument();
  });

  it('displays players in descending order of playtime', () => {
    render(<PlayerPlaytimes activePlayers={mockPlayers} benchPlayers={[]} />);
    
    const playerElements = screen.getAllByTestId('player-playtime');
    
    // First player should be John Doe with 90 minutes
    expect(playerElements[0]).toHaveTextContent('John Doe');
    expect(playerElements[0]).toHaveTextContent('90 min');
    
    // Second player should be Jane Smith with 45 minutes
    expect(playerElements[1]).toHaveTextContent('Jane Smith');
    expect(playerElements[1]).toHaveTextContent('45 min');
    
    // Third player should be Bob Johnson with 15 minutes
    expect(playerElements[2]).toHaveTextContent('Bob Johnson');
    expect(playerElements[2]).toHaveTextContent('15 min');
  });

  it('combines and sorts active and bench players correctly', () => {
    const benchPlayers = [
      { id: '4', name: 'Bench Player', position: 'forward', status: 'active', minutesPlayed: 60 }
    ];
    
    render(<PlayerPlaytimes activePlayers={mockPlayers} benchPlayers={benchPlayers} />);
    
    const playerElements = screen.getAllByTestId('player-playtime');
    
    // First player should be John Doe with 90 minutes
    expect(playerElements[0]).toHaveTextContent('John Doe');
    expect(playerElements[0]).toHaveTextContent('90 min');
    
    // Second player should be Bench Player with 60 minutes
    expect(playerElements[1]).toHaveTextContent('Bench Player');
    expect(playerElements[1]).toHaveTextContent('60 min');
  });

  it('handles empty player lists gracefully', () => {
    render(<PlayerPlaytimes activePlayers={[]} benchPlayers={[]} />);
    
    expect(screen.getByText(/Player Play Times/i)).toBeInTheDocument();
    expect(screen.queryByTestId('player-playtime')).not.toBeInTheDocument();
  });

  it('displays playerName property if name is not available', () => {
    const playersWithPlayerName = [
      { id: '1', playerName: 'John Doe', position: 'forward', status: 'active', minutesPlayed: 90 }
    ];
    
    render(<PlayerPlaytimes activePlayers={playersWithPlayerName} benchPlayers={[]} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});