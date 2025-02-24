export interface Squad {
  id?: string | number;
  name: string;
  players?: any[];
}

export interface SquadListProps {
  squads: Squad[];
  loading: boolean;
  handleSelectSquad: (squad: Squad) => void;
  handleEditSquad: (squad: Squad) => void;
}

export interface SquadCardProps {
  squad: Squad;
  index: number;
  onSelectSquad: (squad: Squad) => void;
  handleEditSquad: (squad: Squad) => void;
}