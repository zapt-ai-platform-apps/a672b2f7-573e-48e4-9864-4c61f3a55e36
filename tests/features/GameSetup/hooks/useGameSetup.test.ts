import './useGameSetup.mocks';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useGameSetup from '../../../../src/features/GameSetup/hooks/useGameSetup';

describe('useGameSetup Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initializes with correct default values', () => {
    const { result } = renderHook(() => useGameSetup());
    
    expect(result.current.teamName).toBe('');
    expect(result.current.opponentName).toBe('');
    expect(result.current.matchDate).toBe('');
    expect(result.current.gameLocation).toBe('');
    expect(result.current.playerText).toBe('');
    expect(result.current.players).toEqual([]);
  });

  it('updates teamName when handleTeamNameChange is called', () => {
    const { result } = renderHook(() => useGameSetup());
    
    act(() => {
      result.current.handleTeamNameChange({ target: { value: 'New Team Name' } } as any);
    });
    
    expect(result.current.teamName).toBe('New Team Name');
  });

  it('updates opponentName when handleOpponentNameChange is called', () => {
    const { result } = renderHook(() => useGameSetup());
    
    act(() => {
      result.current.handleOpponentNameChange({ target: { value: 'New Opponent' } } as any);
    });
    
    expect(result.current.opponentName).toBe('New Opponent');
  });

  it('updates matchDate when handleMatchDateChange is called', () => {
    const { result } = renderHook(() => useGameSetup());
    
    act(() => {
      result.current.handleMatchDateChange({ target: { value: '2023-06-15' } } as any);
    });
    
    expect(result.current.matchDate).toBe('2023-06-15');
  });

  it('updates gameLocation when handleGameLocationChange is called', () => {
    const { result } = renderHook(() => useGameSetup());
    
    act(() => {
      result.current.handleGameLocationChange({ target: { value: 'New Stadium' } } as any);
    });
    
    expect(result.current.gameLocation).toBe('New Stadium');
  });

  it('updates playerText when handlePlayerTextChange is called', () => {
    const { result } = renderHook(() => useGameSetup());
    
    act(() => {
      result.current.handlePlayerTextChange({ target: { value: 'Player 1, Player 2' } } as any);
    });
    
    expect(result.current.playerText).toBe('Player 1, Player 2');
  });

  it('parses players when handleParsePlayerText is called', () => {
    const { result } = renderHook(() => useGameSetup());
    
    act(() => {
      result.current.handlePlayerTextChange({ target: { value: 'Player 1, Player 2' } } as any);
      result.current.handleParsePlayerText();
    });
    
    expect(result.current.players.length).toBe(2);
    expect(result.current.players[0].name).toBe('Player 1');
    expect(result.current.players[1].name).toBe('Player 2');
  });
});