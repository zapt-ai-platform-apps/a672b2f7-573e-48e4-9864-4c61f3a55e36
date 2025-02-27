export interface Player {
  id: string;
  name: string;
  isGoalkeeper?: boolean;
  isStartingPlayer?: boolean;
  [key: string]: any;
}

export interface GoalkeeperSelectorProps {
  players: Player[];
  goalkeeper: Player | null;
  onChange: (player: Player | null) => void;
}

export interface GoalkeeperSelectProps {
  startingPlayers: Player[];
  goalkeeper: Player | null;
  setGoalkeeper: (player: Player | null) => void;
  confirmedGoalkeeper: boolean;
  setConfirmedGoalkeeper: (confirmed: boolean) => void;
}

export interface GoalkeeperSettingsProps {
  startingPlayers: Player[];
  goalkeeper: Player | null;
  setGoalkeeper: (player: Player | null) => void;
  includeGKPlaytime: boolean;
  setIncludeGKPlaytime: (include: boolean) => void;
  confirmedGoalkeeper: boolean;
  setConfirmedGoalkeeper: (confirmed: boolean) => void;
}

export interface GKPlaytimeToggleProps {
  includeGKPlaytime: boolean;
  setIncludeGKPlaytime: (include: boolean) => void;
}