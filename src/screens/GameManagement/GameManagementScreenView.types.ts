import { Player, Goal } from '../../types/GameTypes';

export interface GameManagementScreenViewProps {
  playerData: Player[];
  isRunning: boolean;
  ourScore: number;
  opponentScore: number;
  getTimeElapsed: () => number;
  toggleTimer: () => boolean;
  handleEndGame: () => void;
  showEndGameConfirm: boolean;
  confirmEndGame: () => void;
  cancelEndGame: () => void;
  recordGoal?: (team: 'our' | 'opponent', scorer: string, time: number) => void;
  onFieldPlayers?: Player[];
  offFieldPlayers?: Player[];
  getTotalPlayTime?: (player: Player) => number;
  showGoalModal?: boolean;
  setShowGoalModal?: (show: boolean) => void;
  handlePlayerClick?: (player: Player) => void;
  goals?: Goal[];
  setGoals?: (goals: Goal[]) => void;
  setOurScore?: (score: number) => void;
  setOpponentScore?: (score: number) => void;
  
  // Additional props for GameManagementScreenViewContent
  showAddPlayerModal?: boolean;
  setShowAddPlayerModal?: (show: boolean) => void;
  showConfirmEndModal?: boolean;
  setShowConfirmEndModal?: (show: boolean) => void;
  assignGoalkeeper?: () => void;
  handleRemoveLastGoal?: () => void;
  modalContext?: any;
  setModalContext?: (context: any) => void;
  selectedGoalkeeper?: string | null;
  setSelectedGoalkeeper?: (id: string | null) => void;
  handleIncreasePlayers?: () => void;
  handleDecreasePlayers?: () => void;
}