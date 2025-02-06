import React from 'react';
import { useNavigate } from 'react-router-dom';
import CreateSquadForm from './CreateSquadForm.jsx';

function CreateSquadScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 p-8 text-gray-800 dark:text-white">
      <button
        onClick={() => navigate('/squads')}
        className="self-start mb-4 px-4 py-2 bg-gray-300 rounded-md cursor-pointer hover:bg-gray-400"
      >
        Back
      </button>
      <h1 className="text-4xl font-bold mb-8">Create New Squad</h1>
      <CreateSquadForm />
    </div>
  );
}

export default CreateSquadScreen;