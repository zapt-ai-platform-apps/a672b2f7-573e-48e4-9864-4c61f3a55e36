import React from 'react';

interface ErrorMessageProps {
  errorMessage?: string;
}

function ErrorMessage({ errorMessage }: ErrorMessageProps): JSX.Element | null {
  return errorMessage ? (
    <div style={{ color: 'red', marginTop: '8px' }}>{errorMessage}</div>
  ) : null;
}

export default ErrorMessage;