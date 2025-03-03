import React from 'react';
import GoalAndGKModals from './GoalAndGKModals.jsx';
import PlayerModals from './PlayerModals.jsx';

function ModalsContent(props) {
  return (
    <>
      <GoalAndGKModals {...props} />
      <PlayerModals {...props} />
    </>
  );
}

export default ModalsContent;