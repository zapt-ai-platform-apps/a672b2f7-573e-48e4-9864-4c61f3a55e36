import React from 'react';

interface FinalScoreProps {
  ourScore: number;
  opponentScore: number;
}

export default function FinalScore({ ourScore, opponentScore }: FinalScoreProps): JSX.Element {
  const result = ourScore > opponentScore ? 'Win' : ourScore < opponentScore ? 'Loss' : 'Draw';
  
  const resultColor = {
    Win: 'text-green-400',
    Loss: 'text-red-400',
    Draw: 'text-yellow-400'
  }[result];

  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-4 text-white">Final Score</h2>
      <div className="flex justify-center items-center gap-6">
        <div className="text-4xl font-bold text-white">{ourScore}</div>
        <div className="text-2xl text-white opacity-80">:</div>
        <div className="text-4xl font-bold text-white">{opponentScore}</div>
      </div>
      <div className={`mt-2 text-xl font-semibold ${resultColor}`}>
        {result}
      </div>
    </div>
  );
}