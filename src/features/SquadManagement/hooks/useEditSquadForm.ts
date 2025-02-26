import { useState, useEffect, FormEvent } from "react";
import { useStateContext } from "../../../hooks/useStateContext";
import { Squad } from "../../../types/GameTypes";

interface SquadPlayer {
  id: string;
  name: string;
  [key: string]: any;
}

export default function useEditSquadForm() {
  const { selectedSquad, setSelectedSquad } = useStateContext();
  const [squadName, setSquadName] = useState<string>("");
  const [squadPlayersList, setSquadPlayersList] = useState<SquadPlayer[]>([]);
  const [newPlayerName, setNewPlayerName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Pre-populate form with current squad data when editing
  useEffect(() => {
    if (selectedSquad && 'name' in selectedSquad) {
      setSquadName(selectedSquad.name);
      setSquadPlayersList(selectedSquad.players || []);
    }
  }, [selectedSquad]);

  const handleAddPlayer = (): void => {
    if (!newPlayerName.trim()) return;

    const newPlayer: SquadPlayer = {
      id: Date.now().toString(),
      name: newPlayerName.trim(),
    };

    setSquadPlayersList([...squadPlayersList, newPlayer]);
    setNewPlayerName("");
  };

  const handleDeletePlayer = (playerId: string): void => {
    setSquadPlayersList(squadPlayersList.filter((player) => player.id !== playerId));
  };

  const handleUpdateSquad = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    
    if (!squadName.trim()) {
      setError("Squad name is required");
      return;
    }

    if (squadPlayersList.length === 0) {
      setError("At least one player is required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      if (!selectedSquad || !('id' in selectedSquad)) {
        throw new Error("No squad selected or invalid squad");
      }

      const updatedSquad: Squad = {
        ...selectedSquad,
        name: squadName.trim(),
        players: squadPlayersList,
      };

      // Update squad in database
      const response = await fetch(`/api/squads/${updatedSquad.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedSquad),
      });

      if (!response.ok) {
        throw new Error("Failed to update squad");
      }

      // Update squad in state using setSelectedSquad
      setSelectedSquad(updatedSquad);

      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      setLoading(false);
    }
  };

  const handleBack = (): void => {
    setError("");
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