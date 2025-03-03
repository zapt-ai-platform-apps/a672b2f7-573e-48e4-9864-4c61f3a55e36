import React from 'react';
import GoalAndGKModals from '@/features/GameManagement/GoalAndGKModals.jsx';
import PlayerModals from '@/features/GameManagement/PlayerModals.jsx';

function GameManagementModalsContent(props) {
  return (
    <>
      <GoalAndGKModals {...props} />
      <PlayerModals {...props} />
    </>
  );
}

export default GameManagementModalsContent;