import React from 'react';
import { Button } from '@/modules/ui/components/Button';

/**
 * Reusable modal component with consistent styling
 */
export function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'medium',
  closeOnOutsideClick = true,
}) {
  if (!isOpen) return null;
  
  const handleBackdropClick = (e) => {
    if (closeOnOutsideClick && e.target === e.currentTarget) {
      onClose();
    }
  };
  
  // Size classes
  const sizeClasses = {
    small: 'max-w-sm',
    medium: 'max-w-md',
    large: 'max-w-lg',
    xlarge: 'max-w-xl'
  };
  
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className={`bg-white dark:bg-gray-800 p-6 rounded-md shadow-lg ${sizeClasses[size]} w-full max-h-[90vh] overflow-auto`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{title}</h2>
          <button 
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        
        <div className="mb-6">
          {children}
        </div>
        
        {footer ? (
          <div className="flex justify-end space-x-4">
            {footer}
          </div>
        ) : (
          <div className="flex justify-end">
            <Button variant="secondary" onClick={onClose}>Close</Button>
          </div>
        )}
      </div>
    </div>
  );
}