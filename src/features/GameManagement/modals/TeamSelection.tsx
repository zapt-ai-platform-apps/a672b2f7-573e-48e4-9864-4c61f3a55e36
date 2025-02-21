import React from 'react';

interface TeamSelectionProps {
  setTeam: (team: string) => void;
  setConfirmOpponentGoal: (confirm: boolean) => void;
}

export default function TeamSelection({ setTeam, setConfirmOpponentGoal }: TeamSelectionProps) {
  const handleOurGoal = () => {
    setTeam('our');
  };

  const handleOpponentGoal = () => {
    setTeam('opponent');
    setConfirmOpponentGoal(true);
  };

  return (
    <div className="flex flex-col gap-4">
      <button onClick={handleOurGoal} className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded">
        Our Goal
      </button>
      <button onClick={handleOpponentGoal} className="cursor-pointer bg-red-500 text-white px-4 py-2 rounded">
        Opponent Goal
      </button>
    </div>
  );
}