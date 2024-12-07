import SubstitutionControls from './SubstitutionControls';

function SubstitutionPanel(props) {
  const {
    playerData,
    setPlayerData,
    isRunning,
    includeGKPlaytime,
    updatePlayerLists,
    onFieldPlayers,
    offFieldPlayers,
    getTotalPlayTime,
  } = props;

  return (
    <SubstitutionControls
      playerData={playerData}
      setPlayerData={setPlayerData}
      isRunning={isRunning}
      includeGKPlaytime={includeGKPlaytime}
      updatePlayerLists={updatePlayerLists}
      onFieldPlayers={onFieldPlayers}
      offFieldPlayers={offFieldPlayers}
      getTotalPlayTime={getTotalPlayTime}
    />
  );
}

export default SubstitutionPanel;