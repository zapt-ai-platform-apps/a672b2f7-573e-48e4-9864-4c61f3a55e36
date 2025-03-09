import React from 'react';

/**
 * Reusable card component with consistent styling
 */
export function Card({
  children,
  title,
  className = '',
  titleClass = '',
  footerContent = null,
  onClick = null,
  ...props
}) {
  const cardClasses = `bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-shadow duration-200 ${onClick ? 'cursor-pointer hover:shadow-lg' : ''} ${className}`;
  
  return (
    <div 
      className={cardClasses} 
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      {...props}
    >
      {title && (
        <div className="px-5 pt-5 pb-0">
          <h3 className={`text-xl font-semibold text-gray-800 dark:text-white ${titleClass}`}>
            {title}
          </h3>
        </div>
      )}
      
      <div className="p-5">
        {children}
      </div>
      
      {footerContent && (
        <div className="px-5 py-4 bg-gray-50 dark:bg-gray-750 border-t border-gray-200 dark:border-gray-700">
          {footerContent}
        </div>
      )}
    </div>
  );
}

export default Card;