/**
 * ModalContainer component provides a styled container for modal content.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The modal content to display.
 * @returns {JSX.Element} The rendered modal container.
 */
import React from 'react';

function ModalContainer({ children }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-lg max-w-md w-full">
        {children}
      </div>
    </div>
  );
}

export default ModalContainer;