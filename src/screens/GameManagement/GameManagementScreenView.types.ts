import { Player, Goal, GoalData } from '../../types/GameTypes';

export interface TimerControlsProps {
  isRunning: boolean;
  timeElapsed: number;
  toggleTimer: () => boolean;
  startGame?: () => void;
  pauseGame?: () => void;
  startUITimer?: () => void;
  startTimer?: () => void;
  stopTimer?: () => void;
  resetTimer?: () => void;
  getTimeElapsed?: () => number;
  gameIntervals?: Array<{ startTime: number; endTime?: number }>;
  now?: number;
}

export interface GameManagementScreenViewProps {
  playerData: Player[];
  isRunning: boolean;
  ourScore: number;
  opponentScore: number;
  getTimeElapsed: () => string | number;
  toggleTimer: () => boolean;
  handleEndGame?: () => void;
  showEndGameConfirm: boolean;
  confirmEndGame: () => void;
  cancelEndGame: () => void;
  recordGoal?: (
    goal: GoalData, 
    setGoals: React.Dispatch<React.SetStateAction<Goal[]>>, 
    setOurScore: React.Dispatch<React.SetStateAction<number>>, 
    setOpponentScore: React.Dispatch<React.SetStateAction<number>>
  ) => void;
  onFieldPlayers: Player[];
  offFieldPlayers: Player[];
  getTotalPlayTime?: (player: Player) => number;
  showGoalModal: boolean;
  setShowGoalModal: (show: boolean) => void;
  handlePlayerClick?: (player: Player) => void;
  goals: Goal[];
  setGoals?: React.Dispatch<React.SetStateAction<Goal[]>>;
  setOurScore?: React.Dispatch<React.SetStateAction<number>>;
  setOpponentScore?: React.Dispatch<React.SetStateAction<number>>;
  showAddPlayerModal?: boolean;
  setShowAddPlayerModal?: (show: boolean) => void;
  showConfirmEndModal?: boolean;
  setShowConfirmEndModal?: (show: boolean) => void;
  assignGoalkeeper?: () => void;
  handleRemoveLastGoal?: () => void;
  modalContext?: string | null;
  setModalContext?: (context: string | null) => void;
  selectedGoalkeeper?: string | null;
  setSelectedGoalkeeper?: (id: string | null) => void;
  handleIncreasePlayers?: () => void;
  handleDecreasePlayers?: () => void;
  timerControls?: TimerControlsProps;
}