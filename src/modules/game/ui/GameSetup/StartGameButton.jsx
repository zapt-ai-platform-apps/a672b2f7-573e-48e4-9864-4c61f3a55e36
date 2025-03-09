import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '@/modules/ui/components/Button';

function StartGameButton({ players, startingPlayersCount, goalkeeper, includeGKPlaytime, setErrorMessage, onStartGame }) {
  const navigate = useNavigate();

  const handleStartGame = () => {
    if (players.length === 0) {
      setErrorMessage('You need to add at least one player to start the game.');
      return;
    }
    if (startingPlayersCount === 0) {
      setErrorMessage('Please select at least one starting player.');
      return;
    }
    if (!goalkeeper) {
      setErrorMessage('Please select a goalkeeper.');
      return;
    }
    setErrorMessage('');
    localStorage.setItem('players', JSON.stringify(players));
    onStartGame(players, goalkeeper, includeGKPlaytime);
    toast.success('Game started successfully!');
    navigate('/manage');
  };

  return (
    <Button
      onClick={handleStartGame}
      variant="success"
      size="large"
      className="px-10 py-4 text-xl shadow-md hover:shadow-lg cursor-pointer"
      disabled={players.length === 0 || startingPlayersCount === 0 || !goalkeeper}
    >
      <svg className="w-6 h-6 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      Start Game
    </Button>
  );
}

export default StartGameButton;