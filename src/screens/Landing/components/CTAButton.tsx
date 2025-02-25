import React from 'react';

interface CTAButtonProps {
  onClick: () => void;
}

function CTAButton({ onClick }: CTAButtonProps): JSX.Element {
  return (
    <div className="mt-12 animate-fadeIn" style={{ animationDelay: '1s' }}>
      <button
        onClick={onClick}
        className="relative px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-xl font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-blue-400/40 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer group"
      >
        <span className="relative z-10 flex items-center justify-center">
          Get Started
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform duration-300 transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </span>
        <span className="absolute inset-0 rounded-full bg-white bg-opacity-10 transition-opacity duration-300 opacity-0 group-hover:opacity-100"></span>
      </button>
    </div>
  );
}

export default CTAButton;