export function makeSubstitution({
  playerData,
  setPlayerData,
  selectedSubOffPlayer,
  selectedSubOnPlayer,
  isRunning,
  updatePlayerLists
}) {
  if (selectedSubOffPlayer && selectedSubOnPlayer) {
    const offPlayerName = selectedSubOffPlayer.name;
    const onPlayerName = selectedSubOnPlayer.name;

    setPlayerData(
      playerData.map((player) => {
        if (player.name === offPlayerName) {
          if (player.playIntervals.length > 0 && !player.playIntervals[player.playIntervals.length - 1].endTime) {
            player.playIntervals[player.playIntervals.length - 1].endTime = Date.now();
          }
          return { ...player, isOnField: false };
        }
        if (player.name === onPlayerName) {
          if (isRunning) {
            return {
              ...player,
              isOnField: true,
              playIntervals: [
                ...player.playIntervals,
                { startTime: Date.now(), endTime: null, isGoalkeeper: player.isGoalkeeper }
              ]
            };
          } else {
            return { ...player, isOnField: true };
          }
        }
        return player;
      })
    );
    updatePlayerLists();
  } else {
    alert('Please select a player to sub off and a player to sub on.');
  }
}