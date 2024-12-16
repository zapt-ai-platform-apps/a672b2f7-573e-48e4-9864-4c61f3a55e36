import { toast } from 'solid-toast';
import AddPlayerForm from './AddPlayerForm';
import StartingLineupSelector from './StartingLineupSelector';

function PlayerManager(props) {
  const {
    playerName,
    setPlayerName,
    players,
    addPlayer,
    deletePlayer,
    toggleStartingPlayer,
    startingPlayersCount,
  } = props;

  const handleAddPlayer = () => {
    const success = addPlayer();
    if (success) {
      toast.success('Player added successfully!');
    } else {
      toast.error('Please enter a player name.');
    }
  };

  const handleDeletePlayer = (playerNameToDelete) => {
    const success = deletePlayer(playerNameToDelete);
    if (success) {
      toast.success('Player deleted successfully!');
    }
  };

  return (
    <>
      <AddPlayerForm
        playerName={playerName}
        setPlayerName={setPlayerName}
        handleAddPlayer={handleAddPlayer}
      />
      <StartingLineupSelector
        players={players}
        startingPlayersCount={startingPlayersCount}
        toggleStartingPlayer={toggleStartingPlayer}
        handleDeletePlayer={handleDeletePlayer}
      />
    </>
  );
}

export default PlayerManager;