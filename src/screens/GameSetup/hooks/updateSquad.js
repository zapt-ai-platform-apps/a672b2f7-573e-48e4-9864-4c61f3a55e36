export const getSquadPlayers = (selectedSquad) => {
  let currentSquadPlayers = [];
  if (Array.isArray(selectedSquad.players)) {
    currentSquadPlayers = selectedSquad.players;
  } else if (selectedSquad.players) {
    currentSquadPlayers = selectedSquad.players.split(',').map(p => p.trim()).filter(Boolean);
  }
  return currentSquadPlayers;
};

export const updateSquad = (selectedSquad, updatedSquadPlayers, setSelectedSquad) => {
  const updatedSquad = { ...selectedSquad, players: updatedSquadPlayers };
  setSelectedSquad(updatedSquad);
  import('../../api/squadAPI.js').then(({ updateSquadAPI }) => {
    updateSquadAPI(selectedSquad.id, selectedSquad.name, updatedSquadPlayers)
      .catch((error) => {
        console.error('Failed to update squad in backend:', error);
      });
  });
};