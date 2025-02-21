interface Player {
  id?: string;
  name?: string;
  isInMatchSquad?: boolean;
  [key: string]: unknown;
}

interface Squad {
  players?: (string | Player)[];
}

function initializePlayers(squad: Squad): Player[] {
  if (squad && Array.isArray(squad.players)) {
    return squad.players.map((player, index) => {
      if (typeof player === "string") {
        // If the player is a plain string, use it directly as the name.
        return {
          id: String(index + 1),
          name: player,
          isInMatchSquad: false,
        };
      } else if (typeof player === "object" && player !== null) {
        // If the player is an object, use its name property if available.
        const playerName =
          typeof player.name === "string" && player.name.trim() !== ""
            ? player.name
            : `Player ${index + 1}`;
        return {
          id: player.id ? player.id : String(index + 1),
          ...player,
          name: playerName,
          isInMatchSquad: false,
        };
      }
      // Fallback in case player is neither a string nor an object.
      return {
        id: String(index + 1),
        name: `Player ${index + 1}`,
        isInMatchSquad: false,
      };
    });
  }
  return [];
}

export default initializePlayers;