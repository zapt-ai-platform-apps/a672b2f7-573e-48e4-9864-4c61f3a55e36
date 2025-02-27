import React from 'react';

interface RecordGoalButtonProps {
  onClick: () => void;
}

const RecordGoalButton: React.FC<RecordGoalButtonProps> = ({ onClick }) => {
  return (
    <button
      className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full shadow-lg cursor-pointer transition flex items-center space-x-2"
      onClick={onClick}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-5 w-5" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M12 4v16m8-8H4" 
        />
      </svg>
      <span>Record Goal</span>
    </button>
  );
};

export default RecordGoalButton;