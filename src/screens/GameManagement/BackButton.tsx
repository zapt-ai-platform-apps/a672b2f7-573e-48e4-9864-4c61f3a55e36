import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function BackButton(): JSX.Element {
  const navigate = useNavigate();
  
  return (
    <button 
      className="mb-4 text-blue-500 hover:underline cursor-pointer" 
      onClick={() => navigate(-1)}
      aria-label="Go back to previous screen"
    >
      Back
    </button>
  );
}