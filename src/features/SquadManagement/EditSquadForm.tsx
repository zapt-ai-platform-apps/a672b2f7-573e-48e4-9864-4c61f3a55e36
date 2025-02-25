import React, { ChangeEvent, FormEvent } from "react";
import useEditSquadForm from "./hooks/useEditSquadForm";
import PlayersManager from "./components/PlayersManager";

interface EditSquadFormProps {
  onCancel: () => void;
}

interface SquadPlayer {
  id: string;
  name: string;
  [key: string]: any;
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
    <div className="max-w-2xl w-full mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Edit Squad</h2>
          <button 
            onClick={handleCancel}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white cursor-pointer"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="p-6">
        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 rounded">
            {error}
          </div>
        )}
        
        <form onSubmit={handleFormSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-200 text-sm font-medium mb-2">
              Squad Name
            </label>
            <input
              type="text"
              value={squadName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSquadName(e.target.value)}
              className="shadow-sm appearance-none border border-gray-300 dark:border-gray-600 rounded-lg w-full py-3 px-4 text-gray-700 dark:text-gray-200 dark:bg-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent box-border"
              placeholder="Enter squad name"
              required
            />
          </div>
          
          <PlayersManager
            squadPlayersList={squadPlayersList}
            newPlayerName={newPlayerName}
            setNewPlayerName={setNewPlayerName}
            handleAddPlayer={handleAddPlayer}
            handleDeletePlayer={handleDeletePlayer}
          />
          
          <div className="flex items-center justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg transition-colors duration-200 cursor-pointer"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-sm transition-colors duration-200 cursor-pointer disabled:opacity-50"
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
                "Update Squad"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditSquadForm;