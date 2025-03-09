import React from 'react';

/**
 * Reusable button component with consistent styling
 */
export function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  fullWidth = false,
  className = '',
  type = 'button',
  ...props 
}) {
  // Base classes
  const baseClasses = 'font-medium inline-flex items-center justify-center transition-all duration-200 ease-in-out border border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-brand-500 hover:bg-brand-600 text-white focus:ring-brand-400',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white focus:ring-gray-400',
    success: 'bg-green-500 hover:bg-green-600 text-white focus:ring-green-400',
    danger: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-400',
    warning: 'bg-yellow-500 hover:bg-yellow-600 text-white focus:ring-yellow-400',
    outline: 'bg-transparent border-gray-300 hover:bg-gray-100 text-gray-700 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-gray-200 focus:ring-gray-400'
  };
  
  // Size classes
  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm rounded',
    medium: 'px-4 py-2 text-base rounded-md',
    large: 'px-6 py-3 text-lg rounded-lg'
  };
  
  // Width
  const widthClass = fullWidth ? 'w-full' : '';
  
  // Combine classes
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`;
  
  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;