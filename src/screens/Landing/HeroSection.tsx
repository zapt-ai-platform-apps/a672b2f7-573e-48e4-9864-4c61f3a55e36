import React from 'react';
import CTAButton from './components/CTAButton';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export default function HeroSection({ onGetStarted }: HeroSectionProps): JSX.Element {
  return (
    <section className="flex flex-col items-center justify-center min-h-[70vh] py-16 px-4 text-center relative">
      {/* Enhanced background gradients with better visual balance */}
      <motion.div
        className="absolute top-20 right-20 w-48 h-48 rounded-full bg-blue-500/20 filter blur-[70px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div
        className="absolute bottom-20 left-20 w-64 h-64 rounded-full bg-purple-600/20 filter blur-[85px]"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.25, 0.4, 0.25],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      
      {/* Add a third gradient for better balance */}
      <motion.div
        className="absolute top-40 left-1/4 w-56 h-56 rounded-full bg-indigo-500/20 filter blur-[75px]"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      
      <motion.div
        className="mb-8 relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20 
        }}
      >
        <img 
          src="https://otebnzqfzytqyyjdfhzr.supabase.co/storage/v1/render/image/public/icons/a672b2f7-573e-48e4-9864-4c61f3a55e36/a07d10c7-40ae-490b-922a-cffd0ccb2aea.png?width=180&height=180" 
          alt="Football Subs Logo" 
          className="mx-auto w-36 h-36 drop-shadow-[0_0_35px_rgba(59,130,246,0.7)]"
        />
        <motion.div 
          className="absolute -top-6 -right-6 w-16 h-16 rounded-full bg-blue-500/30 backdrop-blur-sm"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0, -5, 0],
            opacity: [0.6, 0.8, 0.6]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute -bottom-4 -left-4 w-12 h-12 rounded-full bg-purple-500/30 backdrop-blur-sm"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, -5, 0, 5, 0],
            opacity: [0.6, 0.9, 0.6]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </motion.div>
      
      {/* Improved typography with refined gradient and spacing */}
      <motion.h1 
        className="text-5xl md:text-7xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-100 via-indigo-200 to-purple-100 tracking-tight"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        Football Subs
      </motion.h1>
      
      <motion.p 
        className="text-xl md:text-2xl text-blue-50 max-w-3xl mx-auto mb-12 leading-relaxed"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        The ultimate tool for coaches to manage substitutions, 
        <span className="relative inline-block px-1">
          <span className="relative z-10">track play time</span>
          <motion.span 
            className="absolute bottom-1 left-0 w-full h-2 bg-blue-500/30 rounded-sm -z-0"
            animate={{ width: ["0%", "100%", "100%", "0%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
          />
        </span>, 
        and ensure every player gets fair game time
      </motion.p>
      
      {/* Better spacing and balanced button layout */}
      <motion.div 
        className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-7"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.7 }}
      >
        <CTAButton onClick={onGetStarted} />
        
        <motion.a 
          href="#features" 
          className="group mt-4 sm:mt-0 px-7 py-3.5 text-white text-lg border border-white/30 rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center gap-2 cursor-pointer backdrop-blur-sm"
          whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
          whileTap={{ scale: 0.98 }}
        >
          Learn More
          <motion.svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            animate={{ y: [0, 3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </motion.a>
      </motion.div>
      
      {/* Enhanced team section with better spacing and visual hierarchy */}
      <motion.div 
        className="mt-20"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.7 }}
      >
        <h3 className="text-xl text-blue-100 mb-5 font-semibold">Perfect for all teams</h3>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            { name: 'Youth Teams', icon: '👦', delay: 0 },
            { name: 'Amateur Clubs', icon: '⚽', delay: 0.1 },
            { name: 'School Teams', icon: '🎓', delay: 0.2 },
            { name: 'Professional Coaches', icon: '🏆', delay: 0.3 }
          ].map((team, index) => (
            <motion.div 
              key={index} 
              className="px-5 py-2.5 bg-white/10 backdrop-blur-sm rounded-full text-white border border-white/10 shadow-lg flex items-center gap-2.5"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.0 + team.delay, duration: 0.5 }}
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)'
              }}
            >
              <span>{team.icon}</span> {team.name}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}