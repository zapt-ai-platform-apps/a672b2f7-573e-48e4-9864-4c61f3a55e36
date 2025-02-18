import React from 'react';

export default function GKPlaytimeToggle({ includeGKPlaytime, onToggle }) {
  return (
    <div className="relative flex items-start">
      <div className="flex items-center h-5">
        <input
          id="includeGKPlaytime"
          type="checkbox"
          checked={includeGKPlaytime}
          onChange={onToggle}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor="includeGKPlaytime" className="font-medium text-gray-700">
          Include Goalkeeper Playtime
        </label>
        <p className="text-gray-500 mt-1">
          Track goalkeeper's playing time same as field players
        </p>
      </div>
    </div>
  );
}