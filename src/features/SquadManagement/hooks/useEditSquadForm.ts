import { useState, useEffect } from "react";
import { useStateContext } from "../../../hooks/useStateContext";
import { SquadPlayer, normalizePlayers } from "../utils/playerUtils";

function useEditSquadForm() {
  const { selectedSquad } = useStateContext();

  const [squadName, setSquadName] = useState(selectedSquad?.name || "");
  const [squadPlayersList, setSquadPlayersList] = useState<string[]>(() => {
    if (!selectedSquad?.players) return [];
    // Extract only player names from the normalized data
    return normalizePlayers(selectedSquad.players).map(player => player.name);
  });

  const [newPlayerName, setNewPlayerName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedSquad) {
      setSquadName(selectedSquad.name || "");
      // Extract only player names from the normalized data
      const playerNames = normalizePlayers(selectedSquad.players).map(player => player.name);
      setSquadPlayersList(playerNames);
    }
  }, [selectedSquad]);

  const handleAddPlayer = () => {
    if (newPlayerName.trim() === "") return;
    
    // Add the player name directly to the string array
    setSquadPlayersList([...squadPlayersList, newPlayerName.trim()]);
    setNewPlayerName("");
  };

  const handleDeletePlayer = (playerToDelete: string) => {
    setSquadPlayersList(squadPlayersList.filter((playerName) => playerName !== playerToDelete));
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