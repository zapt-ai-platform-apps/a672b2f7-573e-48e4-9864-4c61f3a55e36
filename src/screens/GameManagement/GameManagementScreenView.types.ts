export interface GameManagementScreenViewProps {
  playerData: any[];
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
  getTotalPlayTime: (player: any) => string;
  showGoalModal: boolean;
  setShowGoalModal: (value: boolean) => void;
  handlePlayerClick: (playerId: string) => void;
}