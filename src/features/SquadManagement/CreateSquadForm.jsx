import React from 'react';

function CreateSquadForm() {
  const [squadName, setSquadName] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New squad created with name:', squadName);
    setSquadName('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm">
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2" htmlFor="squadName">
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
          className="px-4 py-2 bg-green-500 text-white text-lg rounded-md cursor-pointer hover:bg-green-600 transition-colors"
        >
          Create Squad
        </button>
      </div>
    </form>
  );
}

export default CreateSquadForm;