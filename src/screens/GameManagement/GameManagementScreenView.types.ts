export interface GameManagementScreenViewProps {
  playerData: any;
  isRunning: boolean;
  ourScore: number;
  opponentScore: number;
  getTimeElapsed: () => string;
  toggleTimer: () => void;
  handleEndGame: () => void;
  showEndGameConfirm: boolean;
  confirmEndGame: () => void;
  cancelEndGame: () => void;
  recordGoal: (playerId: string) => void;
  onFieldPlayers: any[];
  offFieldPlayers: any[];
  getTotalPlayTime: (playerId: string) => string;
  showGoalModal: boolean;
  setShowGoalModal: (show: boolean) => void;
  handlePlayerClick: (playerId: string) => void;
}