import { Player, Squad } from '../../../../types/GameTypes';

function initializePlayers(squad: Squad): Player[] {
  if (!squad.players) return [];
  
  return squad.players.map(player => ({
    id: player.id,
    name: player.name,
    isStartingPlayer: false,
    totalPlayTime: 0,
    isOnField: false,
    isGoalkeeper: false,
    position: { x: 0, y: 0 }
  }));
}

export default initializePlayers;