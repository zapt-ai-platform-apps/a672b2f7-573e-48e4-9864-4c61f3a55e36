import parsePlayers from '../../../utils/parsePlayers';
import { ExtendedPlayer } from '../types/ExtendedPlayer';

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
    if (matchSquad && matchSquad.length > 0 && 'isInMatchSquad' in matchSquad[0]) {
      console.log('Using existing matchSquad with isInMatchSquad flags');
      return matchSquad;
    } else {
      const playersWithMatchFlag = squadPlayers.map((player: any) => ({
        ...player,
        isInMatchSquad: false,
      }));
      console.log('Creating new matchSquadPlayers:', playersWithMatchFlag);
      return playersWithMatchFlag;
    }
  }
  return [];
}