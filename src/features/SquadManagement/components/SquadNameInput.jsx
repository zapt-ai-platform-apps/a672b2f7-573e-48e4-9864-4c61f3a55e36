import React from 'react';

function SquadNameInput({ squadName, setSquadName }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">Squad Name</label>
      <input
        type="text"
        value={squadName}
        onChange={(e) => setSquadName(e.target.value)}
        className="w-full p-2 border rounded"
      />
    </div>
  );
}

export default SquadNameInput;