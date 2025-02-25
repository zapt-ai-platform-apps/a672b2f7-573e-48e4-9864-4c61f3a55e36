import React from 'react';

interface CTAButtonProps {
  onClick: () => void;
}

function CTAButton({ onClick }: CTAButtonProps): JSX.Element {
  return (
    <div className="mt-12 animate-fadeIn" style={{ animationDelay: '0.7s' }}>
      <button
        onClick={onClick}
        className="group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-xl font-medium rounded-xl shadow-lg hover:shadow-indigo-500/30 transition-all duration-500 transform hover:scale-105"
        aria-label="Get Started"
      >
        {/* Inner glow effect */}
        <span className="absolute inset-0 w-full h-full bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
        
        {/* Button content */}
        <span className="relative z-10 flex items-center justify-center">
          Get Started
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 ml-2 transition-transform duration-300 transform group-hover:translate-x-1" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
              clipRule="evenodd" 
            />
          </svg>
        </span>
        
        {/* Shine effect on hover */}
        <span className="absolute top-0 -inset-full h-full w-1/3 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine"></span>
      </button>
    </div>
  );
}

export default CTAButton;