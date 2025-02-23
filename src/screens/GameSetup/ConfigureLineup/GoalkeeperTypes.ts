export interface Player {
  id: string | number;
  name: string;
}

export interface GoalkeeperSettingsProps {
  startingPlayers: Player[];
  goalkeeper: Player | null;
  setGoalkeeper: (g: Player | null) => void;
  includeGKPlaytime: boolean;
  setIncludeGKPlaytime: (value: boolean) => void;
  confirmedGoalkeeper: Player | null;
  setConfirmedGoalkeeper: (g: Player | null) => void;
}