import React from "react";

interface GKPlaytimeToggleProps {
  includeGKPlaytime: boolean;
  setIncludeGKPlaytime: (value: boolean) => void;
}

export default function GKPlaytimeToggle({
  includeGKPlaytime,
  setIncludeGKPlaytime,
}: GKPlaytimeToggleProps) {
  const handleTogglePlaytime = () => {
    setIncludeGKPlaytime(!includeGKPlaytime);
  };

  return (
    <div className="flex items-center mt-4">
      <input
        id="includeGKPlaytime"
        type="checkbox"
        checked={includeGKPlaytime}
        onChange={handleTogglePlaytime}
        className="h-4 w-4 text-blue-600 border-gray-300 rounded cursor-pointer"
      />
      <label htmlFor="includeGKPlaytime" className="ml-2 text-gray-200 cursor-pointer">
        Include Goalkeeper in Rotation
      </label>
      <div className="ml-2 group relative">
        <span className="text-gray-400 cursor-help">ⓘ</span>
        <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-sm p-2 rounded w-64">
          When enabled, the goalkeeper will be included in the regular player rotation. 
          When disabled, the goalkeeper will stay in position for the entire game.
        </div>
      </div>
    </div>
  );
}