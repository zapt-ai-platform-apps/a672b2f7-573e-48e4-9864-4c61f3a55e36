import React from 'react';
import CTAButton from './components/CTAButton';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export default function HeroSection({ onGetStarted }: HeroSectionProps): JSX.Element {
  return (
    <section className="flex flex-col items-center justify-center min-h-[70vh] py-16 px-4 text-center">
      <motion.div
        className="mb-8"
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
          className="mx-auto w-36 h-36 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
        />
      </motion.div>
      
      <motion.h1 
        className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-indigo-300 to-purple-200 animate-text-shimmer"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        Football Subs
      </motion.h1>
      
      <motion.p 
        className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        The ultimate tool for coaches to manage substitutions, track play time, and ensure every player gets fair game time
      </motion.p>
      
      <motion.div 
        className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.7 }}
      >
        <CTAButton onClick={onGetStarted} />
        
        <motion.a 
          href="#features" 
          className="group mt-4 sm:mt-0 px-6 py-3 text-white text-lg border border-white/30 rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center gap-2 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          Learn More
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.a>
      </motion.div>
      
      <motion.div 
        className="mt-16"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.7 }}
      >
        <h3 className="text-xl text-blue-200 mb-4">Perfect for all teams</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { name: 'Youth Teams', delay: 0 },
            { name: 'Amateur Clubs', delay: 0.1 },
            { name: 'School Teams', delay: 0.2 },
            { name: 'Professional Coaches', delay: 0.3 }
          ].map((team, index) => (
            <motion.div 
              key={index} 
              className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white border border-white/5 shadow-lg"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.0 + team.delay, duration: 0.5 }}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
            >
              {team.name}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}