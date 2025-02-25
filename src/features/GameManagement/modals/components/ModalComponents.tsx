import React from 'react';

interface ModalContainerProps {
  children: React.ReactNode;
}

export function ModalContainer({ children }: ModalContainerProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md">
        {children}
      </div>
    </div>
  );
}

interface ManualPlayerFormProps {
  newPlayerName: string;
  setNewPlayerName: (value: string) => void;
}

export function ManualPlayerForm({ newPlayerName, setNewPlayerName }: ManualPlayerFormProps) {
  return (
    <div className="mb-4">
      <input
        type="text"
        value={newPlayerName}
        onChange={(e) => setNewPlayerName(e.target.value)}
        placeholder="Enter player name"
        className="w-full p-2 border border-gray-300 rounded-md"
      />
    </div>
  );
}