import React from 'react';

/**
 * FinalScore component displays the final score of the match.
 *
 * @param {Object} props - Component props.
 * @param {number} props.ourScore - Score of our team.
 * @param {number} props.opponentScore - Score of the opponent team.
 * @returns {JSX.Element} Rendered final score component.
 */
function FinalScore({ ourScore, opponentScore }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-brand-500 dark:text-brand-400">Final Score</h2>
      <p className="text-xl">
        Our Team {ourScore} - {opponentScore} Opponent Team
      </p>
    </div>
  );
}

export default FinalScore;