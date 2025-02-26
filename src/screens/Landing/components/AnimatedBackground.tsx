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
      {/* Enhanced gradient background */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-black/50 z-0"></div>
      
      {/* Animated shapes */}
      {shapes.map(shape => (
        <motion.div 
          key={`shape-${shape.id}`}
          className={`absolute rounded-full bg-gradient-to-br ${shape.color}`}
          style={{
            top: shape.top,
            left: shape.left,
            width: `${shape.size}rem`,
            height: `${shape.size}rem`,
            opacity: shape.opacity,
            filter: `blur(${shape.blur})`,
            borderRadius: shape.type === 'circle' ? '50%' : '25%',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            x: [0, shape.move.x, 0],
            y: [0, shape.move.y, 0],
            rotate: [0, shape.type === 'circle' ? 0 : 45, 0]
          }}
          transition={{
            duration: shape.move.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Stars with enhanced animations */}
      {stars.map(star => (
        <motion.div 
          key={`star-${star.id}`}
          className="absolute rounded-full bg-white"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{
            opacity: [star.opacity * 0.7, star.opacity, star.opacity * 0.7],
            scale: [1, star.pulse ? 1.3 : 1, 1],
            boxShadow: [
              '0 0 2px rgba(255, 255, 255, 0.5)',
              '0 0 8px rgba(255, 255, 255, 0.8)',
              '0 0 2px rgba(255, 255, 255, 0.5)'
            ]
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Larger glowing orbs */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-500/20 filter blur-[100px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
          x: [0, 20, 0],
          y: [0, -20, 0]
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
          opacity: [0.2, 0.25, 0.2],
          x: [0, -30, 0],
          y: [0, 30, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      {/* New indigo orb */}
      <motion.div 
        className="absolute top-2/3 left-1/3 w-80 h-80 rounded-full bg-indigo-600/20 filter blur-[90px]" 
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.25, 0.15],
          x: [0, 40, 0],
          y: [0, 20, 0]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      {/* Moving nebula effect */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
          repeatType: "mirror"
        }}
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3CfeColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"/%3E%3C/filter%3E%3Crect width="100%" height="100%" filter="url(%23noiseFilter)"/%3E%3C/svg%3E")',
          backgroundSize: '200% 200%',
        }}
      />
    </div>
  );
};

export default AnimatedBackground;