import React from 'react';

function GameIntro() {
  return (
    <div className="p-8 bg-white dark:bg-gray-900 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Welcome to Game Setup
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300">
        Prepare your team and configure your match strategy. Set your lineup,
        select your goalkeeper, and manage substitutions to ensure a balanced game.
      </p>
    </div>
  );
}

export default GameIntro;