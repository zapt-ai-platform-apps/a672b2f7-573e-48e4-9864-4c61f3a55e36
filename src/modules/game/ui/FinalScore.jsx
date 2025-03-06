import React from 'react';

function FinalScore({ ourScore, opponentScore }) {
  return (
    <div className="mb-6 md:mb-8">
      <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-brand-500 dark:text-brand-400">Final Score</h2>
      <div className="flex items-center justify-center bg-white dark:bg-gray-800 py-4 rounded-lg shadow-sm">
        <p className="text-xl md:text-2xl font-medium">
          Our Team <span className="font-bold text-2xl md:text-3xl">{ourScore}</span> - <span className="font-bold text-2xl md:text-3xl">{opponentScore}</span> Opponent Team
        </p>
      </div>
    </div>
  );
}

export default FinalScore;