import { useState, useEffect } from "react";
import { useStateContext } from "../../../hooks/useStateContext";
import { SquadPlayer, normalizePlayers } from "../utils/playerUtils";

function useEditSquadForm() {
  const { selectedSquad } = useStateContext();

  const [squadName, setSquadName] = useState(selectedSquad?.name || "");
  const [squadPlayersList, setSquadPlayersList] = useState<SquadPlayer[]>(() => {
    if (!selectedSquad?.players) return [];
    return normalizePlayers(selectedSquad.players);
  });

  const [newPlayerName, setNewPlayerName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedSquad) {
      setSquadName(selectedSquad.name || "");
      const players = normalizePlayers(selectedSquad.players);
      setSquadPlayersList(players);
    }
  }, [selectedSquad]);

  const handleAddPlayer = () => {
    if (newPlayerName.trim() === "") return;

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