import React from 'react';

interface ErrorMessageProps {
  message: string;
}

/**
 * Error message component that displays a message with red styling
 * @param props - Component props
 * @returns Error message component
 */
const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;
  
  return (
    <div 
      data-testid="error-message"
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" 
      role="alert"
    >
      <span className="block sm:inline">{message}</span>
    </div>
  );
};

export default ErrorMessage;