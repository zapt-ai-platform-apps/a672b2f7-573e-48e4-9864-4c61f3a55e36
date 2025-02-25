import React from 'react';
import createShapes from './createShapes';
import createStars from './createStars';

const AnimatedBackground = () => {
  const shapes = createShapes();
  const stars = createStars();

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-black/40 z-0"></div>
      {shapes.map(shape => (
        <div 
          key={`shape-${shape.id}`}
          className={`absolute rounded-full bg-gradient-to-br ${shape.color} opacity-${Math.floor(shape.opacity * 100)}`}
          style={{
            top: shape.top,
            left: shape.left,
            width: shape.size,
            height: shape.size,
            opacity: shape.opacity,
            filter: `blur(${shape.blur})`,
            animation: shape.animation,
            animationDelay: shape.animationDelay,
            borderRadius: shape.type === 'circle' ? '50%' : '25%',
            transform: 'translate(-50%, -50%)',
          }}
        ></div>
      ))}
      {stars.map(star => (
        <div 
          key={`star-${star.id}`}
          className="absolute rounded-full bg-white"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
            animation: star.animation,
            animationDelay: star.animationDelay,
          }}
        ></div>
      ))}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-500/20 filter blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-500/20 filter blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
    </div>
  );
};

export default AnimatedBackground;