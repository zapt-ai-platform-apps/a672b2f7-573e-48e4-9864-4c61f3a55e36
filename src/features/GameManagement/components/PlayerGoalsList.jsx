import React, { useState } from 'react';

function PlayerGoalsList({ playerData, recordGoalForPlayer }) {
  const [disabledButtons, setDisabledButtons] = useState({});

  const handleRecordGoal = (playerName) => {
    if (disabledButtons[playerName]) return;
    setDisabledButtons((prev) => ({ ...prev, [playerName]: true }));
    console.log(`Recording goal for ${playerName}`);
    recordGoalForPlayer(playerName);
    setTimeout(() => {
      setDisabledButtons((prev) => ({ ...prev, [playerName]: false }));
    }, 1000);
  };

  return (
    <div className="my-8 p-4 border rounded bg-white dark:bg-gray-800">
      <h2 className="text-2xl font-bold mb-4 text-green-600">Player Goals List</h2>
      <ul>
        {playerData.length === 0 ? (
          <li className="text-gray-500">No players available.</li>
        ) : (
          playerData.map((player, index) => (
            <li key={index} className="flex items-center justify-between py-2 border-b last:border-0">
              <span className="text-lg">{player.name}</span>
              <button
                onClick={() => handleRecordGoal(player.name)}
                className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600"
                disabled={!!disabledButtons[player.name]}
              >
                Record Goal
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default PlayerGoalsList;