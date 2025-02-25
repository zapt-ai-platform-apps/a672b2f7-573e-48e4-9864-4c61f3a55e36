import parsePlayers from '../../../utils/parsePlayers';
import { ExtendedPlayer } from '../types/ExtendedPlayer';
import { ensurePlayerProperties } from './playerUtils';

export function initializeMatchSquadPlayers(selectedSquad: any, matchSquad: any): ExtendedPlayer[] {
  let squadPlayers: any[] = [];
  
  if (Array.isArray(selectedSquad)) {
    squadPlayers = selectedSquad;
  } else if (selectedSquad && selectedSquad.players) {
    if (typeof selectedSquad.players === 'string') {
      console.log('Parsing players from string:', selectedSquad.players);
      squadPlayers = parsePlayers(selectedSquad.players);
    } else if (Array.isArray(selectedSquad.players)) {
      squadPlayers = selectedSquad.players;
    }
  }
  
  console.log('Processed squadPlayers:', squadPlayers);
  
  if (squadPlayers.length > 0) {
    if (matchSquad && matchSquad.length > 0 && 
        'isInMatchSquad' in matchSquad[0] && 
        'name' in matchSquad[0] && 
        'totalPlayTime' in matchSquad[0] && 
        'isOnField' in matchSquad[0] && 
        'isGoalkeeper' in matchSquad[0] && 
        'position' in matchSquad[0]) {
      console.log('Using existing matchSquad with all required properties');
      return matchSquad;
    } else {
      const playersWithRequiredProps = squadPlayers.map((player: any, index: number) => {
        const playerWithProps = ensurePlayerProperties(player, index);
        return {
          ...playerWithProps,
          isInMatchSquad: false
        };
      });
      
      console.log('Creating new matchSquadPlayers with all required properties:', playersWithRequiredProps);
      return playersWithRequiredProps;
    }
  }
  
  return [];
}

export { ensurePlayerProperties } from './playerUtils';