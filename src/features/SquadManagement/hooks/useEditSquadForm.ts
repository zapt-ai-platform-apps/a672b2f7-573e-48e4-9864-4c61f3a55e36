import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Player, Squad } from '../../../types/GameTypes';
import { useStateContext } from '../../../hooks/useStateContext';
import { fetchSquadById, updateSquad, deleteSquad } from '../api/squadApi';
import * as Sentry from '@sentry/browser';
import parsePlayers from '../../../utils/parsePlayers';

/**
 * Custom hook for managing the edit squad form functionality
 */
export function useEditSquadForm(squadId: number) {
  const [squad, setSquad] = useState<Squad | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [squadName, setSquadName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setSelectedSquad } = useStateContext();

  // Load squad data on component mount
  useEffect(() => {
    const loadSquad = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const fetchedSquad = await fetchSquadById(squadId);
        if (!fetchedSquad) {
          setError('Squad not found');
          setLoading(false);
          return;
        }
        
        // Create a properly typed Squad with players as Player[]
        const typedSquad: Squad = {
          ...fetchedSquad,
          players: typeof fetchedSquad.players === 'string' 
            ? parsePlayers(fetchedSquad.players)
            : fetchedSquad.players
        };
        
        setSquad(typedSquad);
        setSquadName(typedSquad.name);
        
        // Parse players using the improved parsePlayers function
        try {
          console.log('Squad player data type:', typeof fetchedSquad.players);
          console.log('Squad player data:', fetchedSquad.players);
          
          let parsedPlayers: Player[] = [];
          
          if (typeof fetchedSquad.players === 'string') {
            // Use the improved parsePlayers function
            parsedPlayers = parsePlayers(fetchedSquad.players);
          } else if (Array.isArray(fetchedSquad.players)) {
            parsedPlayers = fetchedSquad.players;
          }
          
          console.log('Parsed players:', parsedPlayers);
          setPlayers(Array.isArray(parsedPlayers) ? parsedPlayers : []);
        } catch (parseError) {
          console.error('Error parsing players:', parseError);
          Sentry.captureException(parseError);
          setPlayers([]);
        }
      } catch (err) {
        console.error('Error loading squad:', err);
        Sentry.captureException(err);
        setError('Failed to load squad data');
      } finally {
        setLoading(false);
      }
    };
    
    loadSquad();
  }, [squadId]);

  // Handle squad name change
  const handleSquadNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSquadName(e.target.value);
  };

  // Add new player to squad
  const handleAddPlayer = (player: Player) => {
    setPlayers(prevPlayers => [...prevPlayers, player]);
  };

  // Update existing player
  const handleUpdatePlayer = (updatedPlayer: Player) => {
    setPlayers(prevPlayers => 
      prevPlayers.map(player => 
        player.id === updatedPlayer.id ? updatedPlayer : player
      )
    );
  };

  // Remove player from squad
  const handleRemovePlayer = (playerId: string) => {
    setPlayers(prevPlayers => prevPlayers.filter(player => player.id !== playerId));
  };

  // Save squad changes
  const handleSaveSquad = async () => {
    try {
      if (!squadName.trim()) {
        setError('Squad name is required');
        return;
      }
      
      if (players.length === 0) {
        setError('At least one player is required');
        return;
      }
      
      setLoading(true);
      
      // Use non-null assertion only after checking squad exists
      if (!squad) {
        setError('Squad not found');
        setLoading(false);
        return;
      }
      
      // Create an API-compatible object - KEEP players as an array, not a JSON string
      const apiSquad = {
        id: squad.id,
        name: squadName,
        players: players // Keep players as an array
      };
      
      await updateSquad(apiSquad);
      
      // Updated Squad with players as an array of Player objects for local state
      const updatedSquad: Squad = {
        ...squad,
        name: squadName,
        players // Pass the players array directly
      };
      
      setSelectedSquad(updatedSquad);
      
      navigate('/squads');
    } catch (err) {
      console.error('Error saving squad:', err);
      Sentry.captureException(err);
      setError('Failed to save squad');
    } finally {
      setLoading(false);
    }
  };

  // Delete squad
  const handleDeleteSquad = async () => {
    try {
      if (!squad) {
        setError('Squad not found');
        return;
      }
      
      setLoading(true);
      await deleteSquad(squad.id);
      navigate('/squads');
    } catch (err) {
      console.error('Error deleting squad:', err);
      Sentry.captureException(err);
      setError('Failed to delete squad');
      setLoading(false);
    }
  };

  // Cancel edit and go back
  const handleCancel = () => {
    navigate('/squads');
  };

  return {
    squad,
    players,
    squadName,
    loading,
    error,
    handleSquadNameChange,
    handleAddPlayer,
    handleUpdatePlayer,
    handleRemovePlayer,
    handleSaveSquad,
    handleDeleteSquad,
    handleCancel
  };
}

export default useEditSquadForm;