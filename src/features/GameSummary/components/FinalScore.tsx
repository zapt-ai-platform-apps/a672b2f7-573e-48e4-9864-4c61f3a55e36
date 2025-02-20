import React from 'react';

interface FinalScoreProps {
  ourScore: number;
  opponentScore: number;
}

export default function FinalScore({ ourScore, opponentScore }: FinalScoreProps): JSX.Element {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-brand-500 dark:text-brand-400">Final Score</h2>
      <p className="text-xl">
        Our Team {ourScore} - {opponentScore} Opponent Team
      </p>
    </div>
  );
}