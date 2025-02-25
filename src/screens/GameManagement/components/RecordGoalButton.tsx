import React from 'react';

type RecordGoalButtonProps = {
  setShowGoalModal: (value: boolean) => void;
};

export default function RecordGoalButton({ setShowGoalModal }: RecordGoalButtonProps): JSX.Element {
  return (
    <button
      onClick={() => setShowGoalModal(true)}
      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl font-medium transition-colors cursor-pointer shadow-lg"
    >
      Record Goal
    </button>
  );
}