import React from 'react';

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
    </div>
  );
};

export default AnimatedBackground;