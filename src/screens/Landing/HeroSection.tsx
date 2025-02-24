import React from 'react';

interface HeroSectionProps {
  onGetStarted: () => void;
}

/**
 * HeroSection component displaying the landing page main call-to-action.
 * @param props - Contains onGetStarted function.
 */
function HeroSection({ onGetStarted }: HeroSectionProps): JSX.Element {
  return (
    <section className="hero-section text-center py-20">
      <div className="animate-fadeIn">
        <h1 className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-cyan-300 via-pink-300 to-yellow-300 bg-clip-text text-transparent pb-2">
          Welcome to Football Subs
        </h1>
        <div className="h-1.5 w-32 bg-gradient-to-r from-cyan-400 to-pink-400 mx-auto mt-2 rounded-full"></div>
      </div>
      
      <p className="mt-8 text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto animate-fadeIn" style={{ animationDelay: '0.5s' }}>
        Revolutionize your game management with real-time substitutions and dynamic insights.
      </p>
      
      <button
        onClick={onGetStarted}
        className="mt-12 px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-xl font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-blue-400/40 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 animate-fadeIn cursor-pointer"
        style={{ animationDelay: '1s' }}
      >
        Get Started
      </button>
    </section>
  );
}

export default HeroSection;