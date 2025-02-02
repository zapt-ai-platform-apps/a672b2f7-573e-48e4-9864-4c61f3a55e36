import React from 'react';
import GameManagementMain from './GameManagementMain';

function GameManagementContent(props) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <GameManagementMain {...props} />
    </div>
  );
}

export default GameManagementContent;