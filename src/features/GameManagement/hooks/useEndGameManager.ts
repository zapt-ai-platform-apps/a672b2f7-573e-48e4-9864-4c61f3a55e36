interface PlayInterval {
  startTime: number;
  endTime: number | null;
  isGoalkeeper?: boolean;
}

interface PlayerData {
  id: string | number;
  isOnField: boolean;
  playIntervals: PlayInterval[];
  [key: string]: any;
}

interface GameInterval {
  startTime: number;
  endTime: number | null;
}

interface EndGameManagerParams {
  isRunning: boolean;
  setIsRunning: (value: boolean) => void;
  gameIntervals: GameInterval[];
  setGameIntervals: (intervals: GameInterval[]) => void;
  playerData: PlayerData[];
  setPlayerData: (players: PlayerData[]) => void;
  setShowEndGameConfirm: (show: boolean) => void;
}

function useEndGameManager({
  isRunning,
  setIsRunning,
  gameIntervals,
  setGameIntervals,
  playerData,
  setPlayerData,
  setShowEndGameConfirm
}: EndGameManagerParams) {
  const handleEndGame = (): void => {
    setShowEndGameConfirm(true);
  };

  const confirmEndGame = (): void => {
    if (isRunning) {
      setIsRunning(false);
      setGameIntervals((prev) =>
        prev.map((interval, idx) =>
          idx === prev.length - 1 && !interval.endTime
            ? { ...interval, endTime: Date.now() }
            : interval
        )
      );

      setPlayerData(
        playerData.map((player) => {
          if (player.isOnField) {
            if (player.playIntervals.length > 0 && !player.playIntervals[player.playIntervals.length - 1].endTime) {
              const updatedIntervals = [...player.playIntervals];
              updatedIntervals[updatedIntervals.length - 1].endTime = Date.now();
              return {
                ...player,
                playIntervals: updatedIntervals
              };
            }
          }
          return player;
        })
      );
    }
    setShowEndGameConfirm(false);
  };

  const cancelEndGame = (): void => {
    setShowEndGameConfirm(false);
  };

  return {
    handleEndGame,
    confirmEndGame,
    cancelEndGame
  };
}

export default useEndGameManager;