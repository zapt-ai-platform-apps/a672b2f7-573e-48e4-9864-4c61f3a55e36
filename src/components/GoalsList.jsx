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
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-brand-500">Goals by Our Team</h2>
      {hasGoals ? (
        <ul>
          {Object.entries(playerGoals).map(([playerName, goalCount], index) => (
            <li key={index} className="mb-2">
              <p>
                {playerName}: {goalCount} goal{goalCount !== 1 ? 's' : ''}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No goals scored by our team.</p>
      )}
    </div>
  );
}

export default GoalsList;