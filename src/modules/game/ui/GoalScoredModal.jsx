import React, { useState } from 'react';
import { toast } from 'react-toastify';
import TeamSelection from './TeamSelection';
import ScorerSelection from './ScorerSelection';
import OpponentGoalConfirmation from './OpponentGoalConfirmation';

function GoalScoredModal({ showGoalModal, setShowGoalModal, players, recordGoal }) {
  const [team, setTeam] = useState('');
  const [scorerName, setScorerName] = useState('');
  const [confirmOpponentGoal, setConfirmOpponentGoal] = useState(false);

  const handleConfirm = () => {
    recordGoal(team, scorerName);
    const teamMessage = team === 'our' ? `Goal scored by ${scorerName}!` : 'Opponent scored a goal.';
    toast.success(teamMessage);
    setTeam('');
    setScorerName('');
    setConfirmOpponentGoal(false);
    setShowGoalModal(false);
  };

  const handleCancel = () => {
    setTeam('');
    setScorerName('');
    setConfirmOpponentGoal(false);
    setShowGoalModal(false);
  };

  if (!showGoalModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Goal Scored</h2>
        {!team && (
          <TeamSelection setTeam={setTeam} setConfirmOpponentGoal={setConfirmOpponentGoal} />
        )}
        {team === 'opponent' && confirmOpponentGoal && (
          <OpponentGoalConfirmation handleConfirm={handleConfirm} handleCancel={handleCancel} />
        )}
        {team === 'our' && (
          <ScorerSelection
            players={players}
            scorerName={scorerName}
            setScorerName={setScorerName}
            handleConfirm={handleConfirm}
            handleCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
}

export default GoalScoredModal;