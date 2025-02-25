import { Player, Goal } from '../../types/GameTypes';

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
  recordGoal: (team: 'our' | 'opponent', scorerName: string) => void;
  onFieldPlayers: Player[];
  offFieldPlayers: Player[];
  getTotalPlayTime: (playerId: string) => number;
  showGoalModal: boolean;
  setShowGoalModal: (show: boolean) => void;
  handlePlayerClick: (player: Player) => void;
}