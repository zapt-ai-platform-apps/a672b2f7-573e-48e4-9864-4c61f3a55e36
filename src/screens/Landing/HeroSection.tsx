import React from 'react';
import CTAButton from './components/CTAButton';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export default function HeroSection({ onGetStarted }: HeroSectionProps): JSX.Element {
  return (
    <section className="flex flex-col items-center justify-center min-h-[70vh] py-16 px-4 text-center">
      <div className="animate-fadeIn">
        <img 
          src="https://otebnzqfzytqyyjdfhzr.supabase.co/storage/v1/render/image/public/icons/a672b2f7-573e-48e4-9864-4c61f3a55e36/a07d10c7-40ae-490b-922a-cffd0ccb2aea.png?width=150&height=150" 
          alt="Football Subs Logo" 
          className="mx-auto w-32 h-32 mb-8 drop-shadow-xl"
        />
      </div>
      
      <h1 className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-indigo-300 to-purple-200 animate-fadeIn animate-text-shimmer">
        Football Subs
      </h1>
      
      <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-10 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
        The ultimate tool for coaches to manage substitutions, track play time, and ensure every player gets fair game time
      </p>
      
      <div className="animate-fadeIn flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6" style={{ animationDelay: '0.6s' }}>
        <CTAButton onClick={onGetStarted} />
        
        <a 
          href="#features" 
          className="mt-4 sm:mt-0 px-6 py-3 text-white text-lg border border-white/30 rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
        >
          Learn More
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </div>
      
      <div className="mt-16 animate-fadeIn" style={{ animationDelay: '1s' }}>
        <h3 className="text-xl text-blue-200 mb-4">Perfect for all teams</h3>
        <div className="flex flex-wrap justify-center gap-6">
          {['Youth Teams', 'Amateur Clubs', 'School Teams', 'Professional Coaches'].map((team, index) => (
            <div 
              key={index} 
              className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white"
            >
              {team}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}