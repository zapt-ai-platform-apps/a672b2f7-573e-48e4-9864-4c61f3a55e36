import React from 'react';

const FeaturesSection = () => (
  <div className="mt-16 w-full flex flex-col items-center">
    <h2 className="text-4xl font-bold text-white mb-6">Features</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
      <div className="bg-gray-50 rounded-lg shadow-md p-6 flex flex-col items-center">
        <span className="text-6xl text-indigo-600 mb-4">⏱</span>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Real-Time Tracking</h3>
        <p className="text-center text-gray-600">
          Monitor player playtimes and manage substitutions live during the game.
        </p>
      </div>
      <div className="bg-gray-50 rounded-lg shadow-md p-6 flex flex-col items-center">
        <span className="text-6xl text-indigo-600 mb-4">⚽</span>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Virtual Pitch View</h3>
        <p className="text-center text-gray-600">
          Visualize players on a virtual pitch and adjust positions effortlessly.
        </p>
      </div>
      <div className="bg-gray-50 rounded-lg shadow-md p-6 flex flex-col items-center">
        <span className="text-6xl text-indigo-600 mb-4">📊</span>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Instant Summary</h3>
        <p className="text-center text-gray-600">
          Review detailed game summaries and share match stats instantly.
        </p>
      </div>
    </div>
  </div>
);

export default FeaturesSection;