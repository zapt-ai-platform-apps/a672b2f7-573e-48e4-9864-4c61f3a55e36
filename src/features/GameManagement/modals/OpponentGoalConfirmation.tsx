import React from 'react';

interface OpponentGoalConfirmationProps {
  handleConfirm: () => void;
  handleCancel: () => void;
}

export default function OpponentGoalConfirmation({ handleConfirm, handleCancel }: OpponentGoalConfirmationProps) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-gray-800 dark:text-white">Confirm that the opponent scored a goal?</p>
      <div className="flex justify-end gap-2">
        <button onClick={handleCancel} className="cursor-pointer bg-gray-500 text-white px-4 py-2 rounded">
          Cancel
        </button>
        <button onClick={handleConfirm} className="cursor-pointer bg-green-500 text-white px-4 py-2 rounded">
          Confirm
        </button>
      </div>
    </div>
  );
}