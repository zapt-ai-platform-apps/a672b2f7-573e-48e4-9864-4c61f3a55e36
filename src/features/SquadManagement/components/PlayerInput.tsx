import React, { ChangeEvent } from 'react';

interface PlayerInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onAdd?: () => void;
  placeholder?: string;
}

export default function PlayerInput({ value, onChange, onAdd, placeholder }: PlayerInputProps): JSX.Element {
  return (
    <div className="flex space-x-2">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="flex-1 p-2 bg-white/20 text-white placeholder-white/50 border-0 rounded-lg focus:ring-2 focus:ring-blue-400 box-border"
      />
      <button
        type="button"
        onClick={onAdd}
        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors cursor-pointer"
      >
        Add
      </button>
    </div>
  );
}