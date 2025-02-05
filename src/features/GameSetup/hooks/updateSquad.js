export function getSquadPlayers(selectedSquad) {
  return selectedSquad && selectedSquad.players ? selectedSquad.players : [];
}

export function updateSquad(selectedSquad, updatedSquadPlayers, setSelectedSquad) {
  if (selectedSquad) {
    const updatedSquad = { ...selectedSquad, players: updatedSquadPlayers };
    setSelectedSquad(updatedSquad);
    localStorage.setItem('selectedSquad', JSON.stringify(updatedSquad));
  }
}