import React from 'react';

function GameIntro() {
  return (
    <div className="mb-8 text-center">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">Game Setup</h1>
      <div className="max-w-3xl mx-auto">
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Set up your team for today's match. Select your starting players and assign a goalkeeper to track playtime and manage substitutions.
        </p>
      </div>
    </div>
  );
}

export default GameIntro;