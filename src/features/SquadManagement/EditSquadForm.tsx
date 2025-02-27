import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Sentry from '@sentry/browser';
import useEditSquadForm from './hooks/useEditSquadForm';
import PlayersManager from './components/PlayersManager';
import { Player } from '../../types/GameTypes';

const EditSquadForm: React.FC = () => {
  const { squadId } = useParams<{ squadId?: string }>();
  const navigate = useNavigate();
  const [newPlayerName, setNewPlayerName] = useState('');
  
  // Convert squadId to number or use default
  const id = squadId ? parseInt(squadId, 10) : 0;
  
  const {
    squad,
    players,
    squadName,
    loading,
    error,
    handleSquadNameChange,
    handleAddPlayer,
    handleRemovePlayer,
    handleSaveSquad,
    handleDeleteSquad,
    handleCancel
  } = useEditSquadForm(id);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-500/20 border border-red-500 rounded-lg max-w-md mx-auto my-10">
        <h2 className="text-xl font-bold text-white mb-2">Error</h2>
        <p className="text-white">{error}</p>
        <button 
          onClick={() => navigate('/squads')}
          className="mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded cursor-pointer"
        >
          Back to Squads
        </button>
      </div>
    );
  }

  // Function to handle player addition
  const handleAddNewPlayer = () => {
    if (newPlayerName.trim()) {
      try {
        // Create a new player with required properties
        const newPlayer: Player = {
          id: Date.now().toString(),
          name: newPlayerName.trim(),
          isOnField: false,
          isGoalkeeper: false,
          position: { x: 0, y: 0 },
          totalPlayTime: 0,
          isInMatchSquad: false,
          isInStartingLineup: false,
          playIntervals: []
        };
        
        handleAddPlayer(newPlayer);
        setNewPlayerName('');
      } catch (error) {
        console.error('Failed to add player:', error);
        Sentry.captureException(error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center text-white">Edit Squad</h1>
      
      <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg">
        {/* Squad Name Input */}
        <div className="mb-6">
          <label className="block text-white text-sm font-medium mb-2">Squad Name</label>
          <input
            type="text"
            value={squadName}
            onChange={handleSquadNameChange}
            className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:outline-none box-border"
            placeholder="Enter squad name"
          />
        </div>
        
        {/* Players Manager Component */}
        <PlayersManager
          squadPlayersList={players}
          newPlayerName={newPlayerName}
          onNewPlayerNameChange={setNewPlayerName}
          handleAddPlayer={handleAddNewPlayer}
          handleDeletePlayer={handleRemovePlayer}
        />
        
        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 mt-8">
          <button
            onClick={handleSaveSquad}
            disabled={loading}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-lg rounded-lg shadow-md cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : 'Save Squad'}
          </button>
          <button
            onClick={handleCancel}
            className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-lg rounded-lg shadow-md cursor-pointer transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteSquad}
            className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-lg rounded-lg shadow-md cursor-pointer transition-colors"
          >
            Delete Squad
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSquadForm;