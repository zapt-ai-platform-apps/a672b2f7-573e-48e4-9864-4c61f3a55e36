import React from 'react';

const HeroSection = ({ onGetStarted }) => (
  <div className="text-center">
    <img
      src="https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjQ4Nzh8MHwxfHNlYXJjaHwxfHxBJTIwZm9vdGJhbGwlMjBpY29uJTIwd2l0aCUyMHN1YnN0aXR1dGlvbnMlMjBhcnJvd3N8ZW58MHx8fHwxNzMxMDE4MjY2fDA&ixlib=rb-4.0.3&q=80&w=1080"
      alt="Football Subs Logo"
      className="w-40 h-40 mb-6 rounded-full shadow-lg"
      data-image-request="A football icon with substitutions arrows"
    />
    <h1 className="text-6xl font-extrabold text-white mb-4 drop-shadow-sm">Football Subs</h1>
    <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
      Effortlessly manage your team's substitutions, track game events, and ensure fair playtime for every player.
    </p>
    <button
      onClick={onGetStarted}
      className="px-8 py-4 bg-white text-purple-700 text-2xl rounded-full cursor-pointer hover:bg-gray-300 transition-colors duration-300 shadow-lg"
    >
      Get Started
    </button>
  </div>
);

export default HeroSection;