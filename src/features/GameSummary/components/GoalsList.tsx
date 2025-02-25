import React from 'react';

interface Goal {
  team: string;
  scorerName: string;
}

interface GoalsListProps {
  goals?: Goal[];
}

function GoalsList({ goals = [] }: GoalsListProps): JSX.Element {
  const goalsByPlayer = (): Record<string, number> => {
    const counts: Record<string, number> = {};
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
        <p>Goals: None</p>
      )}
    </div>
  );
}

export default GoalsList;