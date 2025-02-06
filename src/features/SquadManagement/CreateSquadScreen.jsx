import React from 'react';
import CreateSquadForm from './CreateSquadForm.jsx';

function CreateSquadScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 p-8 text-gray-800 dark:text-white">
      <h1 className="text-4xl font-bold mb-8">Create New Squad</h1>
      <CreateSquadForm />
    </div>
  );
}

export default CreateSquadScreen;