import React, { useState } from 'react';
import * as Sentry from '@sentry/browser';

function ShareSummaryButton({ ourScore, opponentScore, playerData, goals, includeGKPlaytime, getTotalPlayTime, formatTime }) {
  const [isSharing, setIsSharing] = useState(false);

  const handleShareSummary = async () => {
    setIsSharing(true);
    try {
      let summaryText = `Final Score: Our Team ${ourScore} - ${opponentScore} Opponent Team\n\n`;

      const goalsByPlayerData = {};
      goals
        .filter((goal) => goal.team === 'our')
        .forEach((goal) => {
          const scorer = goal.scorerName;
          if (goalsByPlayerData[scorer]) {
            goalsByPlayerData[scorer]++;
          } else {
            goalsByPlayerData[scorer] = 1;
          }
        });

      summaryText += 'Goals by Our Team:\n';
      if (Object.keys(goalsByPlayerData).length > 0) {
        Object.entries(goalsByPlayerData).forEach(([playerName, goalCount]) => {
          summaryText += `- ${playerName}: ${goalCount} goal${goalCount !== 1 ? 's' : ''}\n`;
        });
      } else {
        summaryText += 'No goals scored by our team.\n';
      }

      summaryText += '\nPlayer Playtimes:\n';
      [...playerData]
        .sort((a, b) => getTotalPlayTime(b) - getTotalPlayTime(a))
        .forEach((player) => {
          summaryText += `- ${player.name}: ${formatTime(getTotalPlayTime(player))}\n`;
        });

      if (!includeGKPlaytime) {
        summaryText += '\nNote: Playtime for goalkeepers is not included.\n';
      }

      if (navigator.share) {
        await navigator.share({
          title: 'Match Summary',
          text: summaryText,
        });
      } else {
        // Fallback for devices without native sharing
        try {
          await navigator.clipboard.writeText(summaryText);
          alert('Summary copied to clipboard!');
        } catch (err) {
          alert('Sharing not supported on this browser. Summary shown below:\n\n' + summaryText);
        }
      }
    } catch (error) {
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
      className={`px-6 py-3 md:px-8 md:py-4 bg-blue-500 text-white text-base md:text-lg rounded-md ${
        isSharing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-blue-600 hover:scale-105'
      } transition duration-300 ease-in-out w-full md:w-auto`}
      onClick={handleShareSummary}
      disabled={isSharing}
    >
      {isSharing ? 'Sharing...' : 'Share Summary'}
    </button>
  );
}

export default ShareSummaryButton;