import { useState, useEffect } from 'react';
import { Player } from '../../../shared/models/player';
import { SquadPlayer } from '../types';

interface EditSquadFormProps {
  squadId: string;
  initialSquadName: string;
  initialPlayers: SquadPlayer[];
  onUpdate: (name: string, players: Player[]) => Promise<void>;
  onCancel: () => void;
}

// Fix: Correct the type conversion from SquadPlayer[] to Player[]
export const useEditSquadForm = ({
  squadId,
  initialSquadName,
  initialPlayers,
  onUpdate,
  onCancel
}: EditSquadFormProps) => {
  const [squadName, setSquadName] = useState(initialSquadName);
  const [players, setPlayers] = useState<SquadPlayer[]>(initialPlayers);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSquadName(e.target.value);
  };

  const handleAddPlayer = () => {
    if (!newPlayerName.trim()) return;
    
    const newPlayer: SquadPlayer = {
      id: `temp-${Date.now()}`,
      name: newPlayerName.trim()
    };
    
    setPlayers([...players, newPlayer]);
    setNewPlayerName('');
  };

  const handleRemovePlayer = (id: string) => {
    setPlayers(players.filter(player => player.id !== id));
  };

  const handlePlayerNameChange = (id: string, name: string) => {
    setPlayers(
      players.map(player => 
        player.id === id ? { ...player, name } : player
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!squadName.trim()) {
      setError('Squad name is required');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      // Convert SquadPlayer[] to Player[] with all required properties
      const playersWithRequiredProps: Player[] = players.map(squadPlayer => ({
        id: squadPlayer.id,
        name: squadPlayer.name,
        isInMatchSquad: false,
        isInStartingLineup: false,
        playIntervals: [],
        position: null,
        isGoalkeeper: false,
        goals: []
      }));
      
      await onUpdate(squadName, playersWithRequiredProps);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    squadName,
    players,
    newPlayerName,
    isSubmitting,
    error,
    handleNameChange,
    setNewPlayerName,
    handleAddPlayer,
    handleRemovePlayer,
    handlePlayerNameChange,
    handleSubmit,
    handleCancel: onCancel
  };
};

export default useEditSquadForm;