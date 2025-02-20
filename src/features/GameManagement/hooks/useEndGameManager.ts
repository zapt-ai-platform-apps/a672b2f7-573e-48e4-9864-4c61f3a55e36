import { Dispatch, SetStateAction } from 'react';

interface EndGameManagerParams {
  isRunning: boolean;
  setIsRunning: Dispatch<SetStateAction<boolean>>;
  gameIntervals: { startTime: number; endTime?: number }[];
  setGameIntervals: Dispatch<SetStateAction<{ startTime: number; endTime?: number }[]>>;
  playerData: any[];
  setPlayerData: (updater: (prev: any[]) => any[]) => void;
  setShowEndGameConfirm: Dispatch<SetStateAction<boolean>>;
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
      setGameIntervals(prev =>
        prev.map((interval, idx) =>
          idx === prev.length - 1 && !interval.endTime
            ? { ...interval, endTime: Date.now() }
            : interval
        )
      );

      setPlayerData(
        playerData.map(player => {
          if (player.isOnField) {
            if (player.playIntervals.length > 0 && !player.playIntervals[player.playIntervals.length - 1].endTime) {
              player.playIntervals[player.playIntervals.length - 1].endTime = Date.now();
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