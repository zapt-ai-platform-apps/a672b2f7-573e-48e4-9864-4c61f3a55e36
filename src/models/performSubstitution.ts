interface Player {
  id: string;
  name: string;
  position: string;
  status: string;
  minutesPlayed: number;
  entryTimes: number[];
  exitTimes: number[];
}

export function performSubstitution(
  activePlayers: Player[],
  benchPlayers: Player[],
  playerOutId: string,
  playerInId: string,
  gameTime: number
): { updatedActivePlayers: Player[]; updatedBenchPlayers: Player[] } {
  const activeIndex = activePlayers.findIndex(p => p.id === playerOutId);
  const benchIndex = benchPlayers.findIndex(p => p.id === playerInId);
  if (activeIndex === -1 || benchIndex === -1) {
    throw new Error('Player not found');
  }

  const playerOut = activePlayers[activeIndex];
  const playerIn = benchPlayers[benchIndex];

  const updatedPlayerIn = {
    ...playerIn,
    position: playerIn.position === 'unassigned' ? playerOut.position : playerIn.position,
    entryTimes: [...playerIn.entryTimes, gameTime]
  };

  const updatedPlayerOut = {
    ...playerOut,
    exitTimes: [...playerOut.exitTimes, gameTime]
  };

  const updatedActivePlayers = activePlayers.map((player, index) => {
    if (index === activeIndex) {
      return updatedPlayerIn;
    }
    return player;
  });

  const updatedBenchPlayers = benchPlayers.map((player, index) => {
    if (index === benchIndex) {
      return updatedPlayerOut;
    }
    return player;
  });

  return { updatedActivePlayers, updatedBenchPlayers };
}