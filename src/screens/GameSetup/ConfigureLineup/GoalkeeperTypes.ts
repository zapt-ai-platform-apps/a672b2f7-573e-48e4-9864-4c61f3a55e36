import { Player } from "../../../types/GameTypes";

export interface GoalkeeperSettingsProps {
  startingPlayers: Player[];
  goalkeeper: Player | null;
  setGoalkeeper: (player: Player | null) => void;
  includeGKPlaytime: boolean;
  setIncludeGKPlaytime: (include: boolean) => void;
  confirmedGoalkeeper: boolean;
  setConfirmedGoalkeeper: (confirmed: boolean) => void;
}