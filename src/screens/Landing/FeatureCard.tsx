import React from 'react';
import { Feature } from '../../data/Feature';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  feature: Feature;
}

export default function FeatureCard({ feature }: FeatureCardProps): JSX.Element {
  return (
    <motion.div 
      className="group bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl hover:bg-white/15 border border-white/10 transition-all duration-500 h-full flex flex-col cursor-pointer"
      whileHover={{ 
        y: -5,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)"
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="h-14 w-14 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500 shadow-md">
        <div className="text-white text-2xl">
          {feature.icon}
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">
        {feature.title}
      </h3>
      
      <p className="text-blue-100 mb-6 flex-grow">
        {feature.description}
      </p>
      
      <div className="mt-auto">
        <div className="relative w-full h-1 bg-white/10 rounded overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500 to-indigo-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
        </div>
      </div>
    </motion.div>
  );
}