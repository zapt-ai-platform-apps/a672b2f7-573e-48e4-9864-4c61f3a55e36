import React from 'react';

function ModalContainer({ children }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-md shadow-lg w-full max-w-lg">
        {children}
      </div>
    </div>
  );
}

export default ModalContainer;