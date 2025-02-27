import React, { ChangeEvent, FormEvent } from "react";
import useEditSquadForm from "./hooks/useEditSquadForm";
import PlayersManager from "./components/PlayersManager";
import { FiX, FiSave, FiEdit2 } from "react-icons/fi";
import { motion } from "framer-motion";

interface EditSquadFormProps {
  onCancel: () => void;
}

function EditSquadForm({ onCancel }: EditSquadFormProps): JSX.Element {
  const {
    squadName,
    setSquadName,
    squadPlayersList,
    newPlayerName,
    setNewPlayerName,
    loading,
    error,
    handleAddPlayer,
    handleDeletePlayer,
    handleUpdateSquad,
    handleBack,
  } = useEditSquadForm();

  const handleCancel = (): void => {
    handleBack();
    onCancel();
  };

  const handleFormSubmit = (e: FormEvent): void => {
    e.preventDefault();
    handleUpdateSquad(e).then(() => {
      onCancel();
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-2xl w-full mx-auto bg-white/10 backdrop-blur-md rounded-xl shadow-lg overflow-hidden border border-white/20"
    >
      <div className="px-6 py-4 bg-gradient-to-r from-blue-800/50 to-indigo-800/50 border-b border-white/10">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white flex items-center">
            <FiEdit2 className="mr-2" /> Edit Squad
          </h2>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleCancel}
            className="text-white/80 hover:text-white cursor-pointer"
            aria-label="Close"
          >
            <FiX className="h-6 w-6" />
          </motion.button>
        </div>
      </div>
      
      <div className="p-6">
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-4 bg-red-500/20 border border-red-400/30 text-red-100 rounded-lg"
          >
            {error}
          </motion.div>
        )}
        
        <form onSubmit={handleFormSubmit}>
          <div className="mb-6">
            <label className="block text-white text-sm font-medium mb-2">
              Squad Name
            </label>
            <input
              type="text"
              value={squadName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSquadName(e.target.value)}
              className="shadow-sm appearance-none border border-white/20 rounded-lg w-full py-3 px-4 text-white bg-white/10 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent box-border placeholder-white/40"
              placeholder="Enter squad name"
              required
            />
          </div>
          
          <PlayersManager
            squadPlayersList={squadPlayersList}
            newPlayerName={newPlayerName}
            onNewPlayerNameChange={setNewPlayerName}
            handleAddPlayer={handleAddPlayer}
            handleDeletePlayer={handleDeletePlayer}
          />
          
          <div className="flex items-center justify-end space-x-4 mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors duration-200 cursor-pointer border border-white/10"
              disabled={loading}
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg shadow-md transition-colors duration-200 cursor-pointer disabled:opacity-50 flex items-center"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </span>
              ) : (
                <>
                  <FiSave className="mr-2" /> Update Squad
                </>
              )}
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}

export default EditSquadForm;