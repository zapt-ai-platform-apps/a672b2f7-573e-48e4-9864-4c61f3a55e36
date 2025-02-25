import React from 'react';

interface TeamSelectionProps {
  setTeam: (team: 'our' | 'opponent') => void;
  setConfirmOpponentGoal: (confirm: boolean) => void;
}

function TeamSelection({ setTeam, setConfirmOpponentGoal }: TeamSelectionProps) {
  const handleOurTeam = () => {
    setTeam('our');
  };

  const handleOpponentTeam = () => {
    setTeam('opponent');
    setConfirmOpponentGoal(true);
  };

  return (
    <div>
      <p className="mb-4 text-gray-600 dark:text-gray-300">Which team scored?</p>
      <div className="flex space-x-4">
        <button
          className="flex-1 py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition cursor-pointer"
          onClick={handleOurTeam}
        >
          Our Team
        </button>
        <button
          className="flex-1 py-3 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg transition cursor-pointer"
          onClick={handleOpponentTeam}
        >
          Opponent
        </button>
      </div>
    </div>
  );
}

export default TeamSelection;