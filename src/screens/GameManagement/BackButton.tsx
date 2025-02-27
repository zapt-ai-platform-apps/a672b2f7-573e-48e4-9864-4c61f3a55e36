import React from 'react';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  onClick?: () => void;
}

export default function BackButton({ onClick }: BackButtonProps): JSX.Element {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(-1);
    }
  };
  
  return (
    <button 
      className="mb-4 text-blue-500 hover:underline cursor-pointer" 
      onClick={handleClick}
      aria-label="Go back to previous screen"
    >
      Back
    </button>
  );
}