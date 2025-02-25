import React from 'react';

export default function AnimatedBackground(): JSX.Element {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-blue-500/20 filter blur-[80px] animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full bg-purple-500/20 filter blur-[80px] animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute top-2/3 left-2/3 w-48 h-48 rounded-full bg-indigo-500/20 filter blur-[80px] animate-pulse" style={{ animationDelay: '0.8s' }}></div>
    </div>
  );
}