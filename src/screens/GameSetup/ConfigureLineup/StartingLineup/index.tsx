import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStartingLineup from './useStartingLineup';
import PlayerCard from './PlayerCard';
import { useStateContext } from '../../../../hooks/useStateContext';
import GoalkeeperSelect from '../GoalkeeperSelect';
import { Player } from '../../../../types/GameTypes';
import { motion } from 'framer-motion';

export default function StartingLineup(): JSX.Element {
  const { startingPlayers, selectedPlayers, toggleStartingPlayer } = useStartingLineup();
  const [goalkeeper, setGoalkeeper] = useState<Player | null>(null);
  const { matchSquad, setMatchSquad } = useStateContext();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    console.log('Current matchSquad in StartingLineup:', matchSquad);
    console.log('startingPlayers in StartingLineup:', startingPlayers);
    console.log('Selected players:', selectedPlayers);
    
    if (!matchSquad || matchSquad.length === 0) {
      setError('No players available. Please go back and select participants.');
    } else if (startingPlayers.length === 0) {
      setError('Failed to load players. Please try again or go back to select participants.');
    } else {
      setError('');
    }
  }, [matchSquad, startingPlayers, selectedPlayers]);

  const handleContinue = (): void => {
    setShowError(false);
    
    if (selectedPlayers.length < 1) {
      setError('Please select at least one starting player');
      setShowError(true);
      return;
    }
    
    if (!goalkeeper && selectedPlayers.length > 0) {
      setError('Please select a goalkeeper');
      setShowError(true);
      return;
    }
    
    // Update matchSquad with selection information before navigating
    const updatedMatchSquad = matchSquad.map(player => {
      const isSelected = selectedPlayers.some(p => p.id === player.id);
      const isGoalkeeper = goalkeeper ? goalkeeper.id === player.id : false;
      
      return {
        ...player,
        isStartingPlayer: isSelected,
        isGoalkeeper: isGoalkeeper
      };
    });
    
    console.log("Updating match squad with selection info:", updatedMatchSquad);
    setMatchSquad(updatedMatchSquad);
    navigate('/setup/configuration');
  };

  const handleBack = (): void => {
    console.log("Back button clicked, navigating back");
    navigate(-1);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.05,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      className="min-h-screen flex flex-col p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex-grow">
        <motion.h1 
          className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Select Starting Lineup
        </motion.h1>
        
        <motion.p 
          className="text-lg text-white/90 mb-6"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Choose which players will start the game
        </motion.p>
        
        {showError && error && (
          <motion.div 
            className="p-4 mb-6 bg-red-500/20 border border-red-500 rounded-lg text-white"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p>{error}</p>
          </motion.div>
        )}
        
        {startingPlayers.length > 0 ? (
          <>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {startingPlayers
                .filter(player => player && typeof player.id === 'string')
                .map(player => (
                  <motion.div key={player.id} variants={itemVariants}>
                    <PlayerCard
                      player={player}
                      isSelected={!!player.selected}
                      onClick={() => toggleStartingPlayer(player.id)}
                      onToggle={() => toggleStartingPlayer(player.id)}
                    />
                  </motion.div>
              ))}
            </motion.div>
            
            <motion.div 
              className="my-6 p-6 bg-white/10 backdrop-blur-sm rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-4 text-white">Goalkeeper Selection</h3>
              <p className="text-white/80 mb-4">Select one of your starting players to be the goalkeeper</p>
              {selectedPlayers.length > 0 ? (
                <GoalkeeperSelect 
                  players={selectedPlayers} 
                  goalkeeper={goalkeeper} 
                  setGoalkeeper={setGoalkeeper} 
                />
              ) : (
                <p className="text-amber-300">Please select at least one starting player first</p>
              )}
            </motion.div>
          </>
        ) : (
          <motion.div 
            className="text-center p-8 bg-white/10 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {matchSquad && matchSquad.length > 0 ? (
              <p className="text-lg text-white/70">Loading players...</p>
            ) : (
              <p className="text-lg text-white/70">No players available. Please go back and select participants first.</p>
            )}
          </motion.div>
        )}
        
        <motion.div 
          className="flex justify-between mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.button
            onClick={handleBack}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg shadow-md transition-colors cursor-pointer backdrop-blur-sm"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.25)" }}
            whileTap={{ scale: 0.95 }}
            data-testid="back-button"
          >
            ← Back
          </motion.button>
          
          <motion.button
            onClick={handleContinue}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-xl rounded-xl hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer"
            disabled={startingPlayers.length === 0}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            Continue to Game Setup →
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}