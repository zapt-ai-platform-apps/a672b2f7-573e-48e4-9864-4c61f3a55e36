import React from 'react';

function FeaturesSection() {
  return (
    <section className="features-section mt-16 w-full max-w-4xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">App Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="feature-card bg-white bg-opacity-80 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-2">Real-Time Substitutions</h3>
          <p className="text-gray-800">
            Easily manage player substitutions live during the match with intuitive controls.
          </p>
        </div>
        <div className="feature-card bg-white bg-opacity-80 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-2">Game Analytics</h3>
          <p className="text-gray-800">
            Track scores, player playtimes, and match events with real-time analytics.
          </p>
        </div>
        <div className="feature-card bg-white bg-opacity-80 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-2">User-Friendly Interface</h3>
          <p className="text-gray-800">
            Enjoy a clean, modern design optimized for both mobile and desktop experiences.
          </p>
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;