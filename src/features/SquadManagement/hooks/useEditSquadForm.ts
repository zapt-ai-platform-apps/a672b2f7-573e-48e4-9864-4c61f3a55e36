import { useState } from "react";

function useEditSquadForm() {
  const [squadName, setSquadName] = useState("");
  const [squadPlayersList, setSquadPlayersList] = useState<string[]>([]);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddPlayer = () => {
    if (newPlayerName.trim() === "") return;
    setSquadPlayersList([...squadPlayersList, newPlayerName.trim()]);
    setNewPlayerName("");
  };

  const handleDeletePlayer = (playerName: string) => {
    setSquadPlayersList(squadPlayersList.filter((player) => player !== playerName));
  };

  const handleUpdateSquad = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setLoading(false);
        resolve();
      }, 1000);
    });
  };

  const handleBack = () => {
    // Navigation or cleanup logic can be added here if needed.
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
}

export default useEditSquadForm;