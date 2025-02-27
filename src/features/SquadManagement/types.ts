// Define the Squad interface with a number ID
export interface Squad {
  id: number;
  name: string;
  players: any[];
  createdAt?: string;
}

// Type for squad operations
export type SquadOperationFn = (id: number) => void;