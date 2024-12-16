import { useNavigate } from '@solidjs/router';
import { toast } from 'solid-toast';

function StartGameButton(props) {
  const {
    players,
    startingPlayersCount,
    goalkeeper,
    includeGKPlaytime,
    setErrorMessage,
    onStartGame,
  } = props;
  const navigate = useNavigate();

  const handleStartGame = () => {
    if (players().length === 0) {
      setErrorMessage('You need at least one player to start the game.');
      return;
    }
    if (startingPlayersCount() === 0) {
      setErrorMessage('Please select at least one starting player.');
      return;
    }
    if (!goalkeeper()) {
      setErrorMessage('Please select a goalkeeper.');
      return;
    }
    setErrorMessage('');
    localStorage.setItem('players', JSON.stringify(players()));
    onStartGame(players(), goalkeeper(), includeGKPlaytime());
    toast.success('Game started successfully!');
    navigate('/manage');
  };

  return (
    <button
      class="px-8 py-4 bg-green-500 text-white text-lg rounded-lg cursor-pointer hover:bg-green-600 hover:scale-105 transition duration-300 ease-in-out"
      onClick={handleStartGame}
    >
      Start Game
    </button>
  );
}

export default StartGameButton;