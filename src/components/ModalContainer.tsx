import React, { ReactNode } from 'react';

interface ModalContainerProps {
  children: ReactNode;
}

function ModalContainer({ children }: ModalContainerProps): JSX.Element {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-lg max-w-md w-full">
        {children}
      </div>
    </div>
  );
}

export default ModalContainer;