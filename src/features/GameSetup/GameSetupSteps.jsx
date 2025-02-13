import React from 'react';

export function GameSetupStepOne({ matchSquadPlayers, selectedMatchPlayers, toggleMatchPlayer, handleNext }) {
  return (
    <div>
      <h1>Step One: Select Players</h1>
      <ul>
        {matchSquadPlayers.map((player) => (
          <li key={player.id}>
            {player.name}
            <input
              type="checkbox"
              checked={selectedMatchPlayers.some(p => p.id === player.id)}
              onChange={() => toggleMatchPlayer(player.id)}
            />
          </li>
        ))}
      </ul>
      <button onClick={handleNext}>Next</button>
    </div>
  );
}

export function GameSetupStepTwo({
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
  handleBack,
  handleStartGame
}) {
  return (
    <div>
      <h1>Step Two: Configure Game</h1>
      <div>
        <input
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Player Name"
        />
        <button onClick={addPlayer}>Add Player</button>
      </div>
      <div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <ul>
          {startingPlayers.map((player) => (
            <li key={player.id}>
              {player.name}
              <button onClick={() => deletePlayer(player.id)}>Delete</button>
              <button onClick={() => toggleStartingPlayer(player.name)}>Toggle Starting</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <label>Goalkeeper: </label>
        <input value={goalkeeper} onChange={(e) => setGoalkeeper(e.target.value)} />
      </div>
      <div>
        <label>Include GK Playtime: </label>
        <input
          type="checkbox"
          checked={includeGKPlaytime}
          onChange={(e) => setIncludeGKPlaytime(e.target.checked)}
        />
      </div>
      <div>
        <button onClick={handleBack}>Back</button>
        <button onClick={handleStartGame}>Start Game</button>
      </div>
    </div>
  );
}

export default GameSetupStepOne;