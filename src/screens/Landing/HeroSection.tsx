import React from 'react';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export default function HeroSection({ onGetStarted }: HeroSectionProps): JSX.Element {
  return (
    <section className="py-20 text-center">
      <h1 className="text-4xl font-bold text-white mb-4">Welcome to Our Application</h1>
      <p className="text-white mb-8">
        Discover a world of features that will help streamline your experience.
      </p>
      <button
        onClick={onGetStarted}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-300"
      >
        Get Started
      </button>
    </section>
  );
}