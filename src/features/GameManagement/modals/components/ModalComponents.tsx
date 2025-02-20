import React from 'react';

export const ModalContainer: React.FC = ({ children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md">
        {children}
      </div>
    </div>
  );
};

interface ManualPlayerFormProps {
  newPlayerName: string;
  setNewPlayerName: (value: string) => void;
}

export const ManualPlayerForm: React.FC<ManualPlayerFormProps> = ({ newPlayerName, setNewPlayerName }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        value={newPlayerName}
        onChange={(e) => setNewPlayerName(e.target.value)}
        placeholder="Enter player name"
        className="w-full border p-2 rounded"
      />
    </div>
  );
};