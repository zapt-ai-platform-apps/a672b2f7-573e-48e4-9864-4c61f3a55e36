import React from 'react';

function GoalsList({ goals = [] }) {
  const goalsByPlayer = () => {
    const counts = {};
    goals
      .filter((goal) => goal.team === 'our')
      .forEach((goal) => {
        const scorer = goal.scorerName;
        if (counts[scorer]) {
          counts[scorer]++;
        } else {
          counts[scorer] = 1;
        }
      });
    return counts;
  };

  const playerGoals = goalsByPlayer();
  const hasGoals = Object.keys(playerGoals).length > 0;

  return (
    <div className="mb-6 md:mb-8">
      <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-brand-500">Goals by Our Team</h2>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
        {hasGoals ? (
          <ul className="space-y-2">
            {Object.entries(playerGoals).map(([playerName, goalCount], index) => (
              <li key={index} className="flex justify-between items-center">
                <span className="text-base md:text-lg">{playerName}</span>
                <span className="font-semibold text-base md:text-lg">{goalCount} goal{goalCount !== 1 ? 's' : ''}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-400 py-2">No goals scored by our team.</p>
        )}
      </div>
    </div>
  );
}

export default GoalsList;