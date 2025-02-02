import React from 'react';
import GoalAndGKModals from './GoalAndGKModals.jsx';
import PlayerModals from './PlayerModals.jsx';

function GameManagementModalsContent(props) {
  return (
    <>
      <GoalAndGKModals {...props} />
      <PlayerModals {...props} />
    </>
  );
}

export default GameManagementModalsContent;