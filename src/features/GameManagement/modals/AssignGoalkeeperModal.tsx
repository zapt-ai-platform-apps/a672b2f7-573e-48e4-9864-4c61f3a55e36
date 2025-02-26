import React, { useState, useEffect } from 'react';
import type { Player } from '../../../types/GameTypes';
import { motion } from 'framer-motion';

interface AssignGoalkeeperModalProps {
  isOpen: boolean;
  onClose: () => void;
  players: Player[];
  onAssign: (playerId: string) => void;
  currentGoalkeeper: Player | null;
}

export default function AssignGoalkeeperModal({
  isOpen,
  onClose,
  players,
  onAssign,
  currentGoalkeeper
}: AssignGoalkeeperModalProps): JSX.Element {
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(
    currentGoalkeeper?.id?.toString() || null
  );

  // Reset selected player when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedPlayer(currentGoalkeeper?.id?.toString() || null);
    }
  }, [isOpen, currentGoalkeeper]);

  if (!isOpen) return null;

  const handleAssign = () => {
    if (selectedPlayer) {
      onAssign(selectedPlayer);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-800 rounded-lg p-6 max-w-md w-full shadow-xl"
      >
        <h2 className="text-2xl font-bold mb-4 text-white">Assign Goalkeeper</h2>
        <p className="mb-4 text-gray-300">
          Select a player to assign as goalkeeper. The current goalkeeper is{' '}
          <span className="font-bold">
            {currentGoalkeeper?.name || 'None'}
          </span>
        </p>

        <div className="max-h-[300px] overflow-y-auto mb-4">
          {players.map((player) => (
            <div
              key={player.id}
              className={`p-3 mb-2 rounded-lg cursor-pointer transition-colors ${
                selectedPlayer === player.id?.toString()
                  ? 'bg-yellow-600'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
              onClick={() => setSelectedPlayer(player.id?.toString() || null)}
            >
              <div className="flex items-center justify-between">
                <span className="text-white">
                  {player.isGoalkeeper ? '🧤 ' : ''}{player.name}
                </span>
                {player.isOnField && (
                  <span className="text-xs bg-green-500 text-white px-2 py-1 rounded">
                    On Field
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded cursor-pointer hover:bg-gray-500 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            disabled={!selectedPlayer}
            className={`px-4 py-2 rounded cursor-pointer transition-colors ${
              !selectedPlayer
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-yellow-600 hover:bg-yellow-500 text-white'
            }`}
          >
            Assign Goalkeeper
          </button>
        </div>
      </motion.div>
    </div>
  );
}