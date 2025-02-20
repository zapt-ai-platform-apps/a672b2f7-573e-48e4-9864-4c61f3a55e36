interface Squad {
  players: any[];
  [key: string]: any;
}

export function getSquadPlayers(selectedSquad: Squad | null): any[] {
  return selectedSquad && selectedSquad.players ? selectedSquad.players : [];
}

export function updateSquad(
  selectedSquad: Squad | null,
  updatedSquadPlayers: any[],
  setSelectedSquad: (squad: Squad) => void
): void {
  if (selectedSquad) {
    const updatedSquad = { ...selectedSquad, players: updatedSquadPlayers };
    setSelectedSquad(updatedSquad);
    localStorage.setItem('selectedSquad', JSON.stringify(updatedSquad));
  }
}