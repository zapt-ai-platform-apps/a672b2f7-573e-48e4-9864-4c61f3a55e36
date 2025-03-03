import { usePlayersState } from '@/modules/players/internal/state';
import { createPlayerServices } from '@/modules/players/internal/services';
import { validateSetupPlayers } from '@/modules/players/validators';

/**
 * Public API for the players module
 */
export function usePlayers() {
  const state = usePlayersState();
  const services = createPlayerServices(state);
  
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
    validateSetupPlayers
  };
}