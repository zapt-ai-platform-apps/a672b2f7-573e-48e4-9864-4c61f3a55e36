import { useState } from "react";

interface SquadPlayer {
  id: string;
  name: string;
  [key: string]: any;
}

export default function useEditSquadForm() {
  const [squadName, setSquadName] = useState("");
  const [squadPlayersList, setSquadPlayersList] = useState<SquadPlayer[]>([]);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddPlayer = () => {
    if (newPlayerName.trim() === "") return;
    const newPlayer = { id: Date.now().toString(), name: newPlayerName.trim() };
    setSquadPlayersList((prev) => [...prev, newPlayer]);
    setNewPlayerName("");
  };

  const handleDeletePlayer = (id: string) => {
    setSquadPlayersList((prev) => prev.filter((player) => player.id !== id));
  };

  const handleUpdateSquad = async (e: React.FormEvent): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (err) {
      setError("Failed to update squad");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    // Implement back navigation logic if needed
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