import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function BackButton(): JSX.Element {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center mb-4">
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg font-medium transition-colors cursor-pointer shadow-sm backdrop-blur-sm"
      >
        ← Back
      </button>
    </div>
  );
}