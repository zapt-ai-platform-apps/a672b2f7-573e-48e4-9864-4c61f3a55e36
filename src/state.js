import { createSignal } from 'solid-js';

export const [playerData, setPlayerData] = createSignal([]);
export const [goalkeeper, setGoalkeeper] = createSignal(null);
export const [includeGKPlaytime, setIncludeGKPlaytime] = createSignal(true);

export const [ourScore, setOurScore] = createSignal(0);
export const [opponentScore, setOpponentScore] = createSignal(0);
export const [goals, setGoals] = createSignal([]);

export const handleStartGame = (players, gk, includeGKTime) => {
  // Initialize player data
  setPlayerData(
    players.map((player) => {
      const isStarting = player.isStartingPlayer;
      const isGoalkeeperPlayer = player.name === gk;
      return {
        name: player.name,
        playIntervals: [], // Start with empty playIntervals
        isOnField: isStarting,
        isGoalkeeper: isGoalkeeperPlayer,
        totalPlayTime: 0, // initial total play time is 0
      };
    })
  );
  setGoalkeeper(gk);
  setIncludeGKPlaytime(includeGKTime);
};

export const resetGame = () => {
  setPlayerData([]);
  setGoalkeeper(null);
  setOurScore(0);
  setOpponentScore(0);
  setGoals([]);
  setIncludeGKPlaytime(true);
};