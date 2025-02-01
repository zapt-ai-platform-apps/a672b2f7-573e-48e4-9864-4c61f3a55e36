import React from 'react';

function ErrorMessage({ errorMessage }) {
  if (!errorMessage) return null;

  return (
    <div className="bg-error/10 text-error p-4 rounded mb-8 text-lg">
      {errorMessage}
    </div>
  );
}

export default ErrorMessage;