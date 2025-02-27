import React, { ChangeEvent, useState } from "react";
import { FiUserPlus, FiTrash2, FiUser } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

interface SquadPlayer {
  id: string;
  name: string;
  [key: string]: any;
}

interface PlayersManagerProps {
  squadPlayersList: SquadPlayer[];
  newPlayerName: string;
  onNewPlayerNameChange: (name: string) => void;
  handleAddPlayer: () => void;
  handleDeletePlayer: (id: string) => void;
}

function PlayersManager({
  squadPlayersList,
  newPlayerName,
  onNewPlayerNameChange,
  handleAddPlayer,
  handleDeletePlayer,
}: PlayersManagerProps): JSX.Element {
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newPlayerName.trim()) {
      e.preventDefault();
      handleAddPlayer();
    }
  };

  return (
    <div>
      <div className="mb-6">
        <label className="block text-white text-sm font-medium mb-3 flex items-center">
          <FiUserPlus className="mr-2" /> Add New Player
        </label>
        <div className={`flex space-x-2 relative ${isInputFocused ? 'ring-2 ring-blue-400 rounded-lg' : ''}`}>
          <input
            type="text"
            value={newPlayerName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onNewPlayerNameChange(e.target.value)}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            onKeyDown={handleKeyPress}
            className="flex-1 appearance-none border border-white/20 rounded-lg py-3 px-4 text-white bg-white/10 leading-tight focus:outline-none focus:border-transparent box-border placeholder-white/40"
            placeholder="Enter player name"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddPlayer}
            type="button"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 shadow-md flex items-center cursor-pointer"
            disabled={!newPlayerName.trim()}
          >
            <FiUserPlus className="mr-2" /> Add
          </motion.button>
        </div>
      </div>

      <div className="bg-white/5 rounded-xl p-2 border border-white/10">
        <h3 className="text-white text-sm font-medium px-3 py-2 flex items-center">
          <FiUser className="mr-2" /> Players ({squadPlayersList.length})
        </h3>

        {squadPlayersList.length === 0 ? (
          <div className="text-white/60 text-center py-6">
            No players added yet. Add your first player above.
          </div>
        ) : (
          <div className="max-h-[300px] overflow-y-auto px-2 py-1">
            <AnimatePresence initial={false}>
              {squadPlayersList.map((player) => (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="group"
                >
                  <div className="flex justify-between items-center p-3 my-1 bg-white/10 hover:bg-white/15 rounded-lg transition-colors">
                    <span className="text-white flex items-center">
                      <FiUser className="mr-2 text-white/70" /> {player.name}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDeletePlayer(player.id)}
                      className="text-red-400 hover:text-red-300 p-1 rounded-full hover:bg-red-500/20 transition-colors cursor-pointer"
                    >
                      <FiTrash2 />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

export default PlayersManager;