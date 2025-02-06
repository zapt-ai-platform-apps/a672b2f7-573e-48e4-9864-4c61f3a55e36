import React, { useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage';

function useMatchSquad() {
  const [matchSquadPlayers, setMatchSquadPlayers] = useState([
    // Example initial players; in a real app these would come from props or an API.
    { id: 1, name: 'Player 1', isInMatch: false, isStartingPlayer: false },
    { id: 2, name: 'Player 2', isInMatch: false, isStartingPlayer: false },
    { id: 3, name: 'Player 3', isInMatch: false, isStartingPlayer: false }
  ]);

  function toggleMatchPlayer(id) {
    setMatchSquadPlayers(prevPlayers =>
      prevPlayers.map(player =>
        player.id === id ? { ...player, isInMatch: !player.isInMatch } : player
      )
    );
  }

  return { matchSquadPlayers, toggleMatchPlayer };
}

function MatchSquadSelector({ allPlayers, selectedPlayers, togglePlayer }) {
  return (
    <div>
      {allPlayers.map(player => (
        <div
          key={player.id}
          onClick={() => togglePlayer(player.id)}
          style={{
            padding: '4px',
            cursor: 'pointer',
            backgroundColor: player.isInMatch ? '#d1fae5' : 'transparent'
          }}
        >
          {player.name} {player.isInMatch ? '(Selected)' : ''}
        </div>
      ))}
    </div>
  );
}

function StartingLineupSelector({ players, startingPlayersCount, toggleStartingPlayer }) {
  return (
    <div>
      {players.map(player => (
        <div
          key={player.id}
          onClick={() => toggleStartingPlayer(player.id)}
          style={{
            padding: '4px',
            cursor: 'pointer',
            backgroundColor: player.isStartingPlayer ? '#fef3c7' : 'transparent'
          }}
        >
          {player.name} {player.isStartingPlayer ? '(Starter)' : ''}
        </div>
      ))}
      <div>Starting Players Count: {startingPlayersCount}</div>
    </div>
  );
}

function GoalkeeperSettings({
  startingPlayers,
  goalkeeper,
  setGoalkeeper,
  includeGKPlaytime,
  setIncludeGKPlaytime
}) {
  return (
    <div>
      <h3>Goalkeeper Settings</h3>
      <div>
        <label>Goalkeeper: </label>
        <select value={goalkeeper || ''} onChange={(e) => setGoalkeeper(e.target.value)}>
          <option value="" disabled>
            Select GK
          </option>
          {startingPlayers.map(player => (
            <option key={player.id} value={player.id}>
              {player.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={includeGKPlaytime}
            onChange={(e) => setIncludeGKPlaytime(e.target.checked)}
          />{' '}
          Include GK Playtime
        </label>
      </div>
    </div>
  );
}

function StartGameButton({ disabled, onStartGame }) {
  return (
    <button disabled={disabled} onClick={onStartGame} style={{ padding: '8px 16px' }}>
      Start Game
    </button>
  );
}

function GameSetupComponents({
  playerName,
  setPlayerName,
  addPlayer,
  deletePlayer,
  toggleStartingPlayer,
  errorMessage,
  setErrorMessage,
  startingPlayers,
  goalkeeper,
  setGoalkeeper,
  includeGKPlaytime,
  setIncludeGKPlaytime,
  handleStartGame
}) {
  const { matchSquadPlayers, toggleMatchPlayer } = useMatchSquad();

  const selectedMatchPlayers = matchSquadPlayers.filter(player => player.isInMatch);
  const startingPlayersFromMatch = selectedMatchPlayers.filter(player => player.isStartingPlayer);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="p-8 flex-grow">
        <h1 className="text-4xl font-bold mb-6 text-green-600">Choose Your Team</h1>
        <p className="mb-4 text-lg">
          Tap to select players for the match and mark them as starters.
        </p>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Match Squad</h2>
          <MatchSquadSelector
            allPlayers={matchSquadPlayers}
            selectedPlayers={selectedMatchPlayers}
            togglePlayer={toggleMatchPlayer}
          />
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Starting Lineup</h2>
          <StartingLineupSelector
            players={selectedMatchPlayers}
            startingPlayersCount={startingPlayersFromMatch.length}
            toggleStartingPlayer={toggleStartingPlayer}
          />
        </div>

        {startingPlayersFromMatch.length > 0 && (
          <div className="mb-8">
            <GoalkeeperSettings
              startingPlayers={startingPlayersFromMatch}
              goalkeeper={goalkeeper}
              setGoalkeeper={setGoalkeeper}
              includeGKPlaytime={includeGKPlaytime}
              setIncludeGKPlaytime={setIncludeGKPlaytime}
            />
          </div>
        )}

        <ErrorMessage errorMessage={errorMessage} />

        <div className="flex justify-end mt-4">
          <StartGameButton
            disabled={
              selectedMatchPlayers.length === 0 ||
              startingPlayersFromMatch.length === 0 ||
              !goalkeeper
            }
            onStartGame={() =>
              handleStartGame(selectedMatchPlayers, goalkeeper, includeGKPlaytime)
            }
          />
        </div>
      </div>
    </div>
  );
}

export default GameSetupComponents;