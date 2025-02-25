import React from 'react';

export default function BackButton(): JSX.Element {
  return (
    <button className="mb-4 text-blue-500 hover:underline" onClick={() => window.history.back()}>
      Back
    </button>
  );
}