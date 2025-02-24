import React from 'react';

interface PlayerInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

export default function PlayerInput({
  value,
  onChange,
  onKeyPress,
  placeholder = 'Player name',
  className = ''
}: PlayerInputProps): JSX.Element {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      placeholder={placeholder}
      className={`px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all box-border ${className}`}
    />
  );
}