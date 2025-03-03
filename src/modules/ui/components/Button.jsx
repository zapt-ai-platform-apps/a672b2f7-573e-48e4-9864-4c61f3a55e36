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
  ...props 
}) {
  // Base classes
  const baseClasses = 'transition-all duration-300 ease-in-out-custom cursor-pointer focus:outline-none focus:ring-2';
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-brand-500 text-white hover:bg-brand-600 focus:ring-brand-400',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-400',
    success: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-400',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-400',
    warning: 'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-400'
  };
  
  // Size classes
  const sizeClasses = {
    small: 'px-4 py-2 text-sm rounded',
    medium: 'px-6 py-3 text-lg rounded-md',
    large: 'px-8 py-4 text-xl rounded-lg'
  };
  
  // Disabled state
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105';
  
  // Width
  const widthClass = fullWidth ? 'w-full' : '';
  
  // Combine classes
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${widthClass} ${className}`;
  
  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}