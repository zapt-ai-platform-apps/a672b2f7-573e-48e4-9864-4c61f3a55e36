import React from 'react';

/**
 * Reusable card component with consistent styling
 */
export function Card({
  children,
  title,
  className = '',
  titleClass = '',
  ...props
}) {
  return (
    <div className={`bg-white dark:bg-gray-800 p-6 rounded-md shadow-md ${className}`} {...props}>
      {title && (
        <h2 className={`text-2xl font-bold mb-4 text-brand-500 dark:text-brand-400 ${titleClass}`}>
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}