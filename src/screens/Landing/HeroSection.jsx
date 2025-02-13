import React from 'react';

const HeroSection = ({ onGetStarted }) => (
  <section className="hero-section text-center py-16">
    <h1 className="text-4xl font-bold text-white">Welcome to Football Subs</h1>
    <p className="mt-4 text-lg text-gray-200">Manage your football substitutions with ease.</p>
    <button 
      onClick={onGetStarted}
      className="mt-8 px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 cursor-pointer"
    >
      Get Started
    </button>
  </section>
);

export default HeroSection;