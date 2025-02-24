import React from 'react';

interface SquadNameInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export default function SquadNameInput({
  value,
  onChange,
  className = ''
}: SquadNameInputProps): JSX.Element {
  return (
    <div>
      <label htmlFor="squadName" className="block text-lg font-medium mb-2 text-white">
        Squad Name
      </label>
      <input
        type="text"
        id="squadName"
        value={value}
        onChange={onChange}
        placeholder="Enter squad name"
        className={`w-full p-3 rounded-lg box-border transition-colors ${className}`}
        required
      />
    </div>
  );
}