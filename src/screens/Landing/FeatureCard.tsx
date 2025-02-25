import React from 'react';

export interface FeatureCardProps {
  title: string;
  description: string;
  icon: JSX.Element;
  delay: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, delay }) => {
  return (
    <div 
      className="feature-card relative overflow-hidden bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/20 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:bg-white/15 group animate-fadeIn"
      style={{ animationDelay: delay }}
    >
      {/* Card Top Decoration */}
      <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-xl transition-all duration-300 group-hover:scale-150"></div>
      
      {/* Icon Container */}
      <div className="mb-6 relative inline-flex items-center justify-center p-3 bg-white/10 rounded-xl">
        {icon}
      </div>
      
      {/* Card Content */}
      <h3 className="text-2xl font-semibold mb-4 text-white group-hover:text-cyan-200 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-300 group-hover:text-white transition-colors duration-300 z-10 relative">
        {description}
      </p>
      
      {/* Hover Indicator */}
      <div className="absolute bottom-4 right-4 opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </div>
    </div>
  );
};

export default FeatureCard;