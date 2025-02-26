import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import createShapes from './createShapes';
import createStars from './createStars';

// Define types for shapes and stars
interface ShapeType {
  id: number;
  top: string;
  left: string;
  size: number;
  opacity: number;
  blur: string;
  type: 'circle' | 'square';
  color: string;
  move: {
    x: number;
    y: number;
    duration: number;
  };
}

interface StarType {
  id: number;
  top: string;
  left: string;
  size: number;
  opacity: number;
  duration: number;
  pulse: boolean;
}

const AnimatedBackground = () => {
  const [shapes, setShapes] = useState<ShapeType[]>([]);
  const [stars, setStars] = useState<StarType[]>([]);
  
  useEffect(() => {
    setShapes(createShapes());
    setStars(createStars());
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-black/40 z-0"></div>
      
      {shapes.map(shape => (
        <motion.div 
          key={`shape-${shape.id}`}
          className={`absolute rounded-full bg-gradient-to-br ${shape.color}`}
          style={{
            top: shape.top,
            left: shape.left,
            width: `${shape.size}rem`, // Added 'rem' unit here
            height: `${shape.size}rem`, // Added 'rem' unit here
            opacity: shape.opacity,
            filter: `blur(${shape.blur})`,
            borderRadius: shape.type === 'circle' ? '50%' : '25%',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            x: [0, shape.move.x, 0],
            y: [0, shape.move.y, 0],
          }}
          transition={{
            duration: shape.move.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {stars.map(star => (
        <motion.div 
          key={`star-${star.id}`}
          className="absolute rounded-full bg-white"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`, // Added 'px' unit here
            height: `${star.size}px`, // Added 'px' unit here
          }}
          animate={{
            opacity: [star.opacity * 0.7, star.opacity, star.opacity * 0.7],
            scale: [1, star.pulse ? 1.2 : 1, 1]
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
      
      <motion.div 
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-500/20 filter blur-[100px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-500/20 filter blur-[100px]" 
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.25, 0.2]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
    </div>
  );
};

export default AnimatedBackground;