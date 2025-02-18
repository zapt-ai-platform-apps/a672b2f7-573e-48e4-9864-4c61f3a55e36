import React from 'react';

/**
 * HeroSection component displaying the landing page main call-to-action.
 * @param {Object} props
 * @param {function} props.onGetStarted - Function to handle the Get Started action.
 */
function HeroSection({ onGetStarted }) {
  return (
    <section className="hero-section text-center py-20">
      <h1 className="text-5xl font-extrabold bg-gradient-to-r from-pink-300 to-yellow-300 bg-clip-text text-transparent animate-fadeIn">
        Welcome to Football Subs
      </h1>
      <p className="mt-6 text-xl text-gray-200 animate-fadeIn" style={{ animationDelay: '0.5s' }}>
        Revolutionize your game management with real-time substitutions and dynamic insights.
      </p>
      <button
        onClick={onGetStarted}
        className="mt-10 px-8 py-4 bg-blue-600 text-white rounded-full transition-transform transform hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 animate-fadeIn"
        style={{ animationDelay: '1s' }}
      >
        Get Started
      </button>
    </section>
  );
}

export default HeroSection;