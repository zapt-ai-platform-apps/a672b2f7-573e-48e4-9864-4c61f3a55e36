import { describe, it, expect } from 'vitest';
import { formatTime, calculateMinutesPlayed } from '../../src/shared/models/timeUtils';

describe('Time Utilities', () => {
  describe('formatTime', () => {
    it('formats time in minutes and seconds', () => {
      expect(formatTime(0)).toBe('00:00');
      expect(formatTime(30)).toBe('00:30');
      expect(formatTime(60)).toBe('01:00');
      expect(formatTime(90)).toBe('01:30');
      expect(formatTime(3600)).toBe('60:00');
    });

    it('handles negative time correctly', () => {
      expect(formatTime(-10)).toBe('00:00');
      expect(formatTime(-60)).toBe('00:00');
    });
  });

  describe('calculateMinutesPlayed', () => {
    it('calculates minutes played correctly for active game', () => {
      const player = {
        id: '1',
        name: 'John Doe',
        position: 'forward',
        status: 'active',
        minutesPlayed: 0,
        entryTimes: [5],
        exitTimes: [15]
      };
      const gameTime = 20;
      const isTimerRunning = true;
      const result = calculateMinutesPlayed(player, gameTime, isTimerRunning);
      expect(result).toBe(0);
    });

    it('calculates minutes played correctly for player currently on pitch', () => {
      const player = {
        id: '1',
        name: 'John Doe',
        position: 'forward',
        status: 'active',
        minutesPlayed: 0,
        entryTimes: [5, 20],
        exitTimes: [15]
      };
      const gameTime = 30;
      const isTimerRunning = true;
      const result = calculateMinutesPlayed(player, gameTime, isTimerRunning);
      expect(result).toBe(0);
    });

    it('handles player with no play time correctly', () => {
      const player = {
        id: '1',
        name: 'John Doe',
        position: 'forward',
        status: 'active',
        minutesPlayed: 0,
        entryTimes: [],
        exitTimes: []
      };
      const gameTime = 30;
      const isTimerRunning = true;
      const result = calculateMinutesPlayed(player, gameTime, isTimerRunning);
      expect(result).toBe(0);
    });

    it('ignores game time when timer is not running', () => {
      const player = {
        id: '1',
        name: 'John Doe',
        position: 'forward',
        status: 'active',
        minutesPlayed: 10,
        entryTimes: [5, 20],
        exitTimes: [15]
      };
      const gameTime = 30;
      const isTimerRunning = false;
      const result = calculateMinutesPlayed(player, gameTime, isTimerRunning);
      expect(result).toBe(10);
    });
  });
});