import React from 'react';

function ErrorMessage({ errorMessage }) {
  return errorMessage ? (
    <div style={{ color: 'red', marginTop: '8px' }}>{errorMessage}</div>
  ) : null;
}

export default ErrorMessage;