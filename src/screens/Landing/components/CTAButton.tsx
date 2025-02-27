import React from 'react';
import { motion } from 'framer-motion';

interface CTAButtonProps {
  onClick: () => void;
}

function CTAButton({ onClick }: CTAButtonProps): JSX.Element {
  return (
    <button
      onClick={onClick}
      className="group relative overflow-hidden px-9 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-xl font-medium rounded-xl shadow-xl hover:shadow-blue-500/40 transition-all duration-300 cursor-pointer"
      aria-label="Get Started"
    >
      {/* Enhanced background particles for visual interest */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full"
          animate={{ 
            x: [0, 20, 0], 
            y: [0, -10, 0],
            opacity: [0, 0.6, 0] 
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/3 w-3 h-3 bg-white/20 rounded-full"
          animate={{ 
            x: [0, -20, 0], 
            y: [0, 15, 0],
            opacity: [0, 0.5, 0] 
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>
      
      {/* Inner glow effect with subtle hover enhancement */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
      
      {/* Button content with improved hover animation */}
      <span className="relative z-10 flex items-center justify-center">
        <span className="mr-2">Get Started</span>
        <motion.svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5 transition-transform duration-300 transform" 
          viewBox="0 0 20 20" 
          fill="currentColor"
          animate={{ x: 0 }}
        >
          <path 
            fillRule="evenodd" 
            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
            clipRule="evenodd" 
          />
        </motion.svg>
      </span>
      
      {/* Enhanced shine effect on hover */}
      <span className="absolute top-0 -inset-full h-full w-1/3 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine"></span>
      
      {/* Improved pulse effect */}
      <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100">
        <motion.span 
          className="absolute inset-0 rounded-xl bg-blue-500/20"
          animate={{ opacity: [0.5, 0.2, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </span>
    </button>
  );
}

export default CTAButton;