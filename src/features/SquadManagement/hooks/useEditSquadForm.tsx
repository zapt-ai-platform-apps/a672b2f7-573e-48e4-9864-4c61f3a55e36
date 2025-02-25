import { useState } from "react";

interface SquadPlayer {
  id: string;
  name: string;
  [key: string]: any;
}

const useEditSquadForm = () => {
  const [squadName, setSquadName] = useState("");
  const [newPlayerName, setNewPlayerName] = useState("");
  const [squadPlayersList, setSquadPlayersList] = useState<SquadPlayer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddPlayer = () => {
    if (!newPlayerName.trim()) return;
    const newPlayer: SquadPlayer = {
      id: Date.now().toString(),
      name: newPlayerName.trim(),
    };
    setSquadPlayersList([...squadPlayersList, newPlayer]);
    setNewPlayerName("");
  };

  const handleDeletePlayer = (playerId: string) => {
    setSquadPlayersList(squadPlayersList.filter((player) => player.id !== playerId));
  };

  const handleUpdateSquad = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    return new Promise((resolve) => {
      setTimeout(() => {
        setLoading(false);
        resolve();
      }, 1000);
    });
  };

  const handleBack = () => {
    // Handle navigating back if needed
  };

  return {
    squadName,
    setSquadName,
    squadPlayersList,
    newPlayerName,
    setNewPlayerName,
    loading,
    error,
    handleAddPlayer,
    handleDeletePlayer,
    handleUpdateSquad,
    handleBack,
  };
};

export default useEditSquadForm;