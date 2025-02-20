export interface PlayInterval {
  startTime: number;
  endTime: number | null;
  isGoalkeeper?: boolean;
}

export interface Player {
  id?: number | string;
  name: string;
  isStartingPlayer?: boolean;
  isInMatchSquad?: boolean;
  playIntervals?: PlayInterval[];
}

export interface UseGameSetupReturn {
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  playerName: string;
  setPlayerName: React.Dispatch<React.SetStateAction<string>>;
  addPlayer: () => void;
  deletePlayer: (playerId: number | string) => void;
  toggleStartingPlayer: (playerId: number | string) => void;
  startingPlayers: Player[];
  goalkeeper: Player | null;
  setGoalkeeper: React.Dispatch<React.SetStateAction<Player | null>>;
  includeGKPlaytime: boolean;
  setIncludeGKPlaytime: React.Dispatch<React.SetStateAction<boolean>>;
  handleStartGame: () => void;
}