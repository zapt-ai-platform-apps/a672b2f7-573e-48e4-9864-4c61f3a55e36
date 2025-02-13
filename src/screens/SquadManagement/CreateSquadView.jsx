import React, { useState } from 'react';

const CreateSquadView = ({ goToOptions, setCurrentView }) => {
  const [squadName, setSquadName] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New squad created with name:', squadName);
    setSquadName('');
    setCurrentView('options');
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <button
        onClick={goToOptions}
        className="mb-4 px-4 py-2 bg-gray-300 rounded-md cursor-pointer"
      >
        Back
      </button>
      <h1 className="text-3xl font-bold mb-6">Create New Squad</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="mb-4">
          <label
            htmlFor="squadName"
            className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2"
          >
            Squad Name
          </label>
          <input
            id="squadName"
            type="text"
            value={squadName}
            onChange={(e) => setSquadName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter squad name"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-md cursor-pointer hover:bg-green-600 transition-all duration-300"
          >
            Create Squad
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSquadView;