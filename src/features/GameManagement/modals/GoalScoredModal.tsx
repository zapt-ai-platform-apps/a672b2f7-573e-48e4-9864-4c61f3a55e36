import React, { useState } from 'react';
import { GoalData } from '../../../types/GameTypes';
import { Player } from '../../../shared/models/player';

interface GoalScoredModalProps {
  onClose: () => void;
  onScoreGoal: (goalData: GoalData) => void;
  playerList: Player[];
  currentGoals: GoalData[];
}

export const GoalScoredModal: React.FC<GoalScoredModalProps> = ({
  onClose,
  onScoreGoal,
  playerList,
  currentGoals
}) => {
  const [team, setTeam] = useState<'our' | 'opponent'>('our');
  const [scorer, setScorer] = useState<string>('');
  const [minute, setMinute] = useState<number>(
    Math.floor(Date.now() / 1000) // Default to current timestamp
  );

  const availablePlayers = playerList.filter(player => player.isParticipating);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const goalData: GoalData = {
      id: `goal-${Date.now()}`,
      team,
      minute,
      scorer: team === 'our' ? scorer : 'Opponent',
      timestamp: Date.now()
    };
    
    onScoreGoal(goalData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Record Goal</h2>
        <form onSubmit={handleSubmit}>
          {/* Team selection */}
          <div className="mb-4">
            <label className="block mb-2">Team</label>
            <div className="flex gap-4">
              <button
                type="button"
                className={`px-4 py-2 rounded ${
                  team === 'our' ? 'bg-blue-600' : 'bg-gray-600 hover:bg-gray-500'
                } transition`}
                onClick={() => setTeam('our')}
              >
                Our Team
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded ${
                  team === 'opponent' ? 'bg-blue-600' : 'bg-gray-600 hover:bg-gray-500'
                } transition`}
                onClick={() => setTeam('opponent')}
              >
                Opponent
              </button>
            </div>
          </div>

          {/* Scorer selection (only for our team) */}
          {team === 'our' && (
            <div className="mb-4">
              <label htmlFor="scorer" className="block mb-2">Scorer</label>
              <select
                id="scorer"
                value={scorer}
                onChange={(e) => setScorer(e.target.value)}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 box-border"
                required
              >
                <option value="">Select Player</option>
                {availablePlayers.map((player) => (
                  <option key={player.id} value={player.id}>
                    {player.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Minutes */}
          <div className="mb-6">
            <label htmlFor="minute" className="block mb-2">Minute</label>
            <input
              type="number"
              id="minute"
              value={minute}
              onChange={(e) => setMinute(parseInt(e.target.value, 10))}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 box-border"
              required
              min="0"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded cursor-pointer"
            >
              Record Goal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GoalScoredModal;