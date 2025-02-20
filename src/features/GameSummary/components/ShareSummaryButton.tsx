import React, { useState } from 'react';
import * as Sentry from '@sentry/browser';
import createGameSummary from '../utils/createGameSummary';

interface ShareSummaryButtonProps {
  ourScore: number;
  opponentScore: number;
  playerData: any[];
  goals: any[];
  includeGKPlaytime: boolean;
  getTotalPlayTime: (player: any) => number;
  formatTime: (time: number) => string;
}

function ShareSummaryButton({ ourScore, opponentScore, playerData, goals, includeGKPlaytime, getTotalPlayTime, formatTime }: ShareSummaryButtonProps): JSX.Element {
  const [isSharing, setIsSharing] = useState(false);

  const handleShareSummary = async () => {
    setIsSharing(true);
    try {
      const summaryText = createGameSummary(ourScore, opponentScore, playerData, goals, includeGKPlaytime, getTotalPlayTime, formatTime);
      if (navigator.share) {
        await navigator.share({
          title: 'Match Summary',
          text: summaryText,
        });
      } else {
        alert('Sharing not supported on this browser.');
      }
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        console.error('Error sharing:', error);
        Sentry.captureException(error);
        alert('An error occurred while sharing. Please try again.');
      }
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <button
      className={`px-8 py-4 bg-blue-500 text-white text-lg rounded-lg ${isSharing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-blue-600 hover:scale-105'} transition duration-300 ease-in-out`}
      onClick={handleShareSummary}
      disabled={isSharing}
    >
      {isSharing ? 'Sharing...' : 'Share Summary'}
    </button>
  );
}

export default ShareSummaryButton;