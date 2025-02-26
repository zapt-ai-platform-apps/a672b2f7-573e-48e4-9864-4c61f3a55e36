import React from 'react';
import { motion } from 'framer-motion';
import { Feature } from '../../data/Feature';

interface FeatureCardProps {
  feature: Feature;
}

export default function FeatureCard({ feature }: FeatureCardProps): JSX.Element {
  // Animation variants
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 10
      }
    }
  };

  // Enhanced hover states
  const hoverState = {
    rest: { 
      scale: 1,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
    },
    hover: { 
      scale: 1.03,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      y: -5
    }
  };

  return (
    <motion.div
      className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 shadow-xl relative"
      variants={item}
      initial="rest"
      whileHover="hover"
      animate="rest"
      whileTap={{ scale: 0.98 }}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"></div>
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full filter blur-[40px]"></div>
      
      <div className="p-6">
        <div className="flex items-center justify-center w-14 h-14 mb-6 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-xl backdrop-blur-sm">
          <motion.div
            initial={{ rotate: 0 }}
            whileHover={{ rotate: [0, -5, 5, -5, 0], scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            {feature.icon}
          </motion.div>
        </div>
        
        <motion.h3 
          className="text-xl font-bold mb-3 text-white group-hover:text-blue-200 transition-colors duration-300"
          whileHover={{ scale: 1.02 }}
        >
          {feature.title}
        </motion.h3>
        
        <motion.p 
          className="text-blue-100/90 leading-relaxed"
          initial={{ opacity: 0.8 }}
          whileHover={{ opacity: 1 }}
        >
          {feature.description}
        </motion.p>
        
        {/* Added visual detail */}
        <motion.div 
          className="mt-6 flex items-center text-blue-300/80 text-sm font-medium"
          whileHover={{ x: 3 }}
        >
          Learn more
          <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.div>
      </div>
      
      {/* Bottom decorative gradient */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent"></div>
    </motion.div>
  );
}