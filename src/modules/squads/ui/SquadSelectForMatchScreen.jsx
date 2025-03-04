import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSquads } from '@/modules/squads/api';
import { Button } from '@/modules/ui/components/Button';
import { Card } from '@/modules/ui/components/Card';
import { toast } from 'react-toastify';
import * as Sentry from '@sentry/browser';

function SquadSelectForMatchScreen() {
  const { squadId } = useParams();
  const navigate = useNavigate();
  const { getSquadPlayers } = useSquads();
  const [players, setPlayers] = useState([]);
  const [squadName, setSquadName] = useState('');
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      setLoading(true);
      try {
        const squadPlayers = await getSquadPlayers(squadId);
        setPlayers(squadPlayers);
        // Attempt to extract squad name from squadPlayers if available
        if (squadPlayers && squadPlayers.length > 0 && squadPlayers[0].squadName) {
          setSquadName(squadPlayers[0].squadName);
        } else {
          setSquadName('Your Squad');
        }
      } catch (error) {
        console.error('Error fetching squad players:', error);
        Sentry.captureException(error);
        toast.error('Failed to load squad players');
      } finally {
        setLoading(false);
      }
    };

    if (squadId) {
      fetchPlayers();
    }
  }, [squadId, getSquadPlayers]);

  const handleTogglePlayer = (player) => {
    if (selectedPlayers.find((p) => p.id === player.id)) {
      setSelectedPlayers(selectedPlayers.filter((p) => p.id !== player.id));
    } else {
      setSelectedPlayers([...selectedPlayers, player]);
    }
  };

  const handleProceed = () => {
    if (selectedPlayers.length === 0) {
      toast.error('Please select at least one player for the match.');
      return;
    }
    // Save the selected players as the starting lineup for the match
    localStorage.setItem(
      'players',
      JSON.stringify(
        selectedPlayers.map((p) => ({
          name: p.name,
          isStartingPlayer: true
        }))
      )
    );
    localStorage.setItem('current_squad_id', squadId);
    navigate('/setup', { state: { fromSquad: true } });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-brand-500 mb-6">
          {squadName} - Select Players for Match
        </h1>
        <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">
          Choose the players you want to include in your match starting lineup.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {players.map((player) => (
            <Card
              key={player.id}
              className={`cursor-pointer ${
                selectedPlayers.find((p) => p.id === player.id)
                  ? 'border-4 border-green-500'
                  : ''
              }`}
              onClick={() => handleTogglePlayer(player)}
            >
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {player.name}
                </h2>
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-8 flex justify-end">
          <Button
            onClick={handleProceed}
            disabled={selectedPlayers.length === 0}
            variant="success"
            className="cursor-pointer"
          >
            Proceed to Game Setup
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SquadSelectForMatchScreen;