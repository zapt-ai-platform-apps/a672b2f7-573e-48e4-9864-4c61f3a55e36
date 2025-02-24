import React from 'react';
import SquadNameInput from './SquadNameInput';
import PlayersManager from './PlayersManager';
import type { Player } from './PlayersManager';

interface SquadFormProps {
  squadName: string;
  players: Player[];
  onSquadNameChange: (name: string) => void;
  onPlayersChange: (players: Player[]) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isSubmitting: boolean;
  submitButtonText: string;
  title: string;
}

export default function SquadForm({
  squadName,
  players,
  onSquadNameChange,
  onPlayersChange,
  onSubmit,
  onCancel,
  isSubmitting,
  submitButtonText,
  title
}: SquadFormProps): JSX.Element {
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold mb-6 text-white">{title}</h2>
      
      <SquadNameInput
        value={squadName}
        onChange={(e) => onSquadNameChange(e.target.value)}
        className="bg-white/20 text-white placeholder-white/50 border-0 focus:ring-2 focus:ring-blue-400"
      />
      
      <PlayersManager
        players={players}
        onPlayersChange={onPlayersChange}
      />
      
      <div className="flex justify-between">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg shadow-md transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-lg shadow-md transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Saving...' : submitButtonText}
        </button>
      </div>
    </form>
  );
}