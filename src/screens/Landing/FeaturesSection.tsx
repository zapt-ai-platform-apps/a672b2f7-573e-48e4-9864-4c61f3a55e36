import React from 'react';

/**
 * FeaturesSection component displays key app features in stylish card format.
 */
function FeaturesSection(): JSX.Element {
  return (
    <section className="features-section mt-20 w-full max-w-5xl mx-auto px-4 animate-fadeIn" style={{ animationDelay: '1.5s' }}>
      <h2 className="text-4xl font-bold text-white mb-10 text-center">
        Discover the Power of Football Subs
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="feature-card bg-white bg-opacity-90 p-8 rounded-xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">
            Real-Time Substitutions
          </h3>
          <p className="text-gray-700">
            Effortlessly manage on-field player changes with live, intuitive controls.
          </p>
        </div>
        <div className="feature-card bg-white bg-opacity-90 p-8 rounded-xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">
            Game Analytics
          </h3>
          <p className="text-gray-700">
            Monitor scores, playtimes, and game events with advanced real-time analytics.
          </p>
        </div>
        <div className="feature-card bg-white bg-opacity-90 p-8 rounded-xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">
            Intuitive Interface
          </h3>
          <p className="text-gray-700">
            Experience a seamless, modern design optimized for all devices, ensuring effortless navigation.
          </p>
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;