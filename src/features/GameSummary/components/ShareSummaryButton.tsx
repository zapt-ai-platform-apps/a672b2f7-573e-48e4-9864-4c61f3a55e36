import React, { useState } from 'react';
import { createGameSummary } from '../utils/createGameSummary';

interface ShareSummaryButtonProps {
  ourScore: number;
  opponentScore: number;
  playerData: any[];
  goals: any[];
  includeGKPlaytime: boolean;
  getTotalPlayTime: (player: any) => number;
  formatTime: (time: number) => string;
}

export default function ShareSummaryButton({
  ourScore,
  opponentScore,
  playerData,
  goals,
  includeGKPlaytime,
  getTotalPlayTime,
  formatTime
}: ShareSummaryButtonProps): JSX.Element {
  const [isSharing, setIsSharing] = useState<boolean>(false);
  const [isShared, setIsShared] = useState<boolean>(false);

  const handleShare = async (): Promise<void> => {
    try {
      setIsSharing(true);

      const summary = createGameSummary({
        ourScore,
        opponentScore,
        playerData,
        goals,
        getTotalPlayTime,
        formatTime,
        includeGKPlaytime
      });

      if (navigator.share) {
        await navigator.share({
          title: 'Football Subs Game Summary',
          text: summary
        });
      } else {
        await navigator.clipboard.writeText(summary);
        setIsShared(true);
        setTimeout(() => setIsShared(false), 3000);
      }
    } catch (error) {
      console.error('Error sharing:', error);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <button
      onClick={handleShare}
      disabled={isSharing}
      className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-xl shadow-lg cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-400 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isSharing ? 'Sharing...' : isShared ? 'Copied to Clipboard!' : 'Share Summary'}
    </button>
  );
}