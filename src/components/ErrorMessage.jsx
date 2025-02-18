/**
 * ErrorMessage component displays an error message if provided.
 *
 * @param {Object} props - Component props.
 * @param {string} props.errorMessage - The error message to display.
 * @returns {JSX.Element|null} The rendered error message or null if no error.
 */
import React from 'react';

function ErrorMessage({ errorMessage }) {
  return errorMessage ? (
    <div style={{ color: 'red', marginTop: '8px' }}>{errorMessage}</div>
  ) : null;
}

export default ErrorMessage;