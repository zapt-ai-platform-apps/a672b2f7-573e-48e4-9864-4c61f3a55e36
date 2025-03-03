import { usePlayersState } from '@/modules/players/internal/state';
import { createPlayerServices } from '@/modules/players/internal/services';
import { validateSetupPlayers, validatePlayers } from '@/modules/players/validators';

/**
 * Public API for the players module
 */
export function usePlayers() {
  const state = usePlayersState();
  const services = createPlayerServices(state);
  
  // Validate initial state
  try {
    validatePlayers(state.players, {
      actionName: 'initializePlayersModule',
      location: 'players/api.js:usePlayers',
      direction: 'internal', 
      moduleFrom: 'players',
      moduleTo: 'players'
    });
  } catch (error) {
    console.error('Player state validation error:', error);
    // Continue with default state if validation fails
  }
  
  return {
    // State access
    getAllPlayers: () => state.players,
    getOnFieldPlayers: services.getOnFieldPlayers,
    getOffFieldPlayers: services.getOffFieldPlayers,
    
    // Player management
    addPlayer: state.addPlayer,
    removePlayer: state.removePlayer,
    updatePlayer: state.updatePlayer,
    
    // Game functionality
    getPlayerPlaytime: services.getPlayerPlaytime,
    makeSubstitution: services.makeSubstitution,
    changeGoalkeeper: services.changeGoalkeeper,
    updatePlayerPosition: services.updatePlayerPosition,
    
    // Setup
    initializePlayers: services.initializePlayers,
    validateSetupPlayers: (players, metadata = {}) => validateSetupPlayers(players, {
      actionName: 'validateSetupPlayers',
      location: 'players/api.js:validateSetupPlayers',
      direction: 'incoming',
      moduleFrom: 'ui',
      moduleTo: 'players',
      ...metadata
    }),
    setPlayerData: state.setPlayers
  };
}