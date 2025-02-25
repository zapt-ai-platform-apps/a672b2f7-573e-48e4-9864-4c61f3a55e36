import React from 'react';
import { SquadNameInput, PlayerInput } from './SquadInputs';
import SquadPlayersList from './SquadPlayersList';

interface SquadFormProps {
  squadName: string;
  setSquadName: (name: string) => void;
  newSquadPlayer: string;
  setNewSquadPlayer: (player: string) => void;
  squadPlayersList: any[];
  handleAddSquadPlayer: () => void;
  handleDeleteSquadPlayer: (player: any) => void;
  handleCreateSquad?: () => void;
  onUpdateSquad?: () => void;
  editMode?: boolean;
  loading: boolean;
}

export default function SquadForm({
  squadName,
  setSquadName,
  newSquadPlayer,
  setNewSquadPlayer,
  squadPlayersList,
  handleAddSquadPlayer,
  handleDeleteSquadPlayer,
  handleCreateSquad,
  onUpdateSquad,
  editMode = false,
  loading
}: SquadFormProps): JSX.Element {
  return (
    <div className="space-y-6">
      <SquadNameInput 
        squadName={squadName} 
        setSquadName={setSquadName} 
      />
      
      <PlayerInput 
        newSquadPlayer={newSquadPlayer} 
        setNewSquadPlayer={setNewSquadPlayer} 
        handleAddSquadPlayer={handleAddSquadPlayer} 
      />
      
      <SquadPlayersList 
        squadPlayersList={squadPlayersList} 
        handleDeleteSquadPlayer={handleDeleteSquadPlayer} 
      />
      
      {editMode ? (
        <button
          className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-lg rounded-md cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={onUpdateSquad}
          disabled={loading || !squadName || squadPlayersList.length === 0}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Updating Squad...
            </span>
          ) : (
            'Update Squad'
          )}
        </button>
      ) : (
        <button
          className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-lg rounded-md cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleCreateSquad}
          disabled={loading || !squadName || squadPlayersList.length === 0}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating Squad...
            </span>
          ) : (
            'Create Squad'
          )}
        </button>
      )}
    </div>
  );
}