import type { Player } from '../../types/GameTypes';

export interface GameManagementScreenViewProps {
  playerData: Player[];
  isRunning: boolean;
  ourScore: number;
  opponentScore: number;
  getTimeElapsed: () => number;
  toggleTimer: () => void;
  handleEndGame: () => void;
  showEndGameConfirm: boolean;
  confirmEndGame: () => void;
  cancelEndGame: () => void;
  recordGoal: (player: Player) => void;
  onFieldPlayers: Player[];
  offFieldPlayers: Player[];
  getTotalPlayTime: (player: Player) => number;
  showGoalModal: boolean;
  setShowGoalModal: (show: boolean) => void;
  handlePlayerClick: (player: Player) => void;
}