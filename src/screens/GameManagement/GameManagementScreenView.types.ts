import { Player, Goal } from '../../types/GameTypes';

export interface GameManagementScreenViewProps {
  playerData: Player[];
  isRunning: boolean;
  ourScore: number;
  opponentScore: number;
  getTimeElapsed: () => string; // Changed from number to string for formatted time display
  toggleTimer: () => void;
  handleEndGame: () => void;
  showEndGameConfirm: boolean;
  confirmEndGame: () => void;
  cancelEndGame: () => void;
  recordGoal: (team: 'our' | 'opponent', scorerName: string) => void;
  onFieldPlayers: Player[];
  offFieldPlayers: Player[];
  getTotalPlayTime: (player: Player) => number; // Changed from playerId: string to player: Player
  showGoalModal: boolean;
  setShowGoalModal: (show: boolean) => void;
  handlePlayerClick: (player: Player) => void;
}