function useEndGameManager({ isRunning, setIsRunning, gameIntervals, setGameIntervals, playerData, setPlayerData, showEndGameConfirm, setShowEndGameConfirm }) {

  const handleEndGame = () => {
    setShowEndGameConfirm(true);
  };

  const confirmEndGame = (navigate) => {
    if (isRunning()) {
      setIsRunning(false);
      setGameIntervals((prev) =>
        prev.map((interval, idx) =>
          idx === prev.length - 1 && interval.endTime === null
            ? { ...interval, endTime: Date.now() }
            : interval
        )
      );

      setPlayerData(
        playerData().map((player) => {
          if (player.isOnField) {
            if (
              player.playIntervals.length > 0 &&
              player.playIntervals[player.playIntervals.length - 1].endTime === null
            ) {
              player.playIntervals[player.playIntervals.length - 1].endTime = Date.now();
            }
          }
          return player;
        })
      );
    }
    setShowEndGameConfirm(false);
    navigate('/summary');
  };

  const cancelEndGame = () => {
    setShowEndGameConfirm(false);
  };

  return {
    handleEndGame,
    confirmEndGame,
    cancelEndGame,
  };
}

export default useEndGameManager;