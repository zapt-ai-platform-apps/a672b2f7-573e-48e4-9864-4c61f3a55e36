import React, { useEffect, useRef } from 'react';
import { Button } from './Button';

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
  const modalRef = useRef(null);
  
  // Handle escape key to close modal
  useEffect(() => {
    const handleEscKey = (event) => {
      if (isOpen && event.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isOpen, onClose]);
  
  // Focus trap inside modal
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);
  
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
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
    >
      <div 
        ref={modalRef}
        className={`bg-white dark:bg-gray-800 rounded-lg shadow-xl ${sizeClasses[size]} w-full max-h-[calc(100vh-2rem)] overflow-auto focus:outline-none`}
        tabIndex={-1}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{title}</h2>
          <button 
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-400"
            onClick={onClose}
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto">
          {children}
        </div>
        
        {footer && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750 rounded-b-lg">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;