import { Player } from '../../../types/GameTypes';

interface PlayInterval {
  start: number;
  end: number | null;
}

interface GameInterval {
  start: number;
  end: number | null;
}

interface EndGameManagerParams {
  isRunning: boolean;
  setIsRunning: (value: boolean) => void;
  gameIntervals: GameInterval[];
  setGameIntervals: (intervals: GameInterval[]) => void;
  playerData: Player[];
  setPlayerData: (players: Player[]) => void;
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
      setGameIntervals((prev: GameInterval[]) =>
        prev.map((interval: GameInterval, idx) =>
          idx === prev.length - 1 && !interval.end
            ? { ...interval, end: Date.now() }
            : interval
        )
      );

      setPlayerData(
        playerData.map((player) => {
          if (player.isOnField && player.playIntervals) {
            if (player.playIntervals.length > 0 && !player.playIntervals[player.playIntervals.length - 1].end) {
              const updatedIntervals = [...player.playIntervals];
              updatedIntervals[updatedIntervals.length - 1].end = Date.now();
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