import { useState } from 'react';

function useSquadManagement() {
  const [squadName, setSquadName] = useState('');
  const [newSquadPlayer, setNewSquadPlayer] = useState('');
  const [squadPlayersList, setSquadPlayersList] = useState([]);
  const [squads, setSquads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingSquad, setEditingSquad] = useState(null);

  function handleAddSquadPlayer() {
    const trimmedPlayer = newSquadPlayer.trim();
    if (trimmedPlayer !== '') {
      setSquadPlayersList([...squadPlayersList, trimmedPlayer]);
      setNewSquadPlayer('');
    }
  }

  function handleDeleteSquadPlayer(player) {
    setSquadPlayersList(squadPlayersList.filter((p) => p !== player));
  }

  function handleCreateSquad() {
    if (squadName.trim() === '') return;
    setLoading(true);
    const newSquad = {
      id: Date.now(),
      name: squadName,
      players: squadPlayersList
    };
    setSquads([...squads, newSquad]);
    setSquadName('');
    setSquadPlayersList([]);
    setNewSquadPlayer('');
    setLoading(false);
  }

  function handleEditSquad(squad) {
    setEditingSquad(squad);
    setSquadName(squad.name);
    setSquadPlayersList(squad.players || []);
    setNewSquadPlayer('');
  }

  function handleUpdateSquad() {
    if (!editingSquad || squadName.trim() === '') return;
    setLoading(true);
    const updatedSquad = {
      ...editingSquad,
      name: squadName,
      players: squadPlayersList
    };
    const updatedSquads = squads.map((squad) =>
      squad.id === editingSquad.id ? updatedSquad : squad
    );
    setSquads(updatedSquads);
    setEditingSquad(null);
    setSquadName('');
    setSquadPlayersList([]);
    setNewSquadPlayer('');
    setLoading(false);
  }

  function handleSelectSquad(squad) {
    setSquadName(squad.name);
    setSquadPlayersList(squad.players || []);
    setNewSquadPlayer('');
  }

  function cancelEdit() {
    setEditingSquad(null);
    setSquadName('');
    setSquadPlayersList([]);
    setNewSquadPlayer('');
  }

  return {
    squadName,
    setSquadName,
    newSquadPlayer,
    setNewSquadPlayer,
    squadPlayersList,
    squads,
    loading,
    editingSquad,
    handleAddSquadPlayer,
    handleDeleteSquadPlayer,
    handleCreateSquad,
    handleUpdateSquad,
    handleSelectSquad,
    handleEditSquad,
    cancelEdit
  };
}

export default useSquadManagement;