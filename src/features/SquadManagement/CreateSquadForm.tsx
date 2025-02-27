import React, { useState, FormEvent, ChangeEvent } from "react";
import { squadServiceApi } from "./services/squadServiceApi";
import { FiX, FiSave, FiUsers } from "react-icons/fi";
import { motion } from "framer-motion";

interface CreateSquadFormProps {
  onCancel: () => void;
}

function CreateSquadForm({ onCancel }: CreateSquadFormProps) {
  const [squadName, setSquadName] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    
    try {
      await squadServiceApi.createSquad({ name: squadName, players: [] });
      setSquadName("");
      onCancel();
    } catch (err) {
      setError("Failed to create squad. Please try again.");
      console.error("Error creating squad:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-md w-full mx-auto bg-white/10 backdrop-blur-md rounded-xl shadow-lg overflow-hidden border border-white/20"
    >
      <div className="px-6 py-4 bg-gradient-to-r from-blue-800/50 to-indigo-800/50 border-b border-white/10">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white flex items-center">
            <FiUsers className="mr-2" /> Create New Squad
          </h2>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onCancel}
            className="text-white/80 hover:text-white cursor-pointer"
            aria-label="Close"
          >
            <FiX className="h-6 w-6" />
          </motion.button>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6">
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-4 bg-red-500/20 border border-red-400/30 text-red-100 rounded-lg"
          >
            {error}
          </motion.div>
        )}
        
        <div className="mb-6">
          <label
            className="block text-white text-sm font-medium mb-2"
            htmlFor="squadName"
          >
            Squad Name
          </label>
          <input
            id="squadName"
            type="text"
            value={squadName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSquadName(e.target.value)}
            className="shadow-sm appearance-none border border-white/20 rounded-lg w-full py-3 px-4 text-white bg-white/10 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent box-border placeholder-white/40"
            placeholder="Enter squad name"
            required
          />
        </div>
        
        <div className="flex items-center justify-end space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors duration-200 cursor-pointer border border-white/10"
            disabled={isSubmitting}
          >
            Cancel
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg shadow-md transition-colors duration-200 cursor-pointer disabled:opacity-50 flex items-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating...
              </span>
            ) : (
              <>
                <FiSave className="mr-2" /> Create Squad
              </>
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}

export default CreateSquadForm;