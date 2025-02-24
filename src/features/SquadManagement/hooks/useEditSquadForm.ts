import { useState, useEffect } from "react";
import { useStateContext } from "../../../hooks/useStateContext";

function useEditSquadForm() {
  const { selectedSquad } = useStateContext();
  
  // Initialize state with values from selectedSquad if available
  const [squadName, setSquadName] = useState(selectedSquad?.name || "");
  const [squadPlayersList, setSquadPlayersList] = useState<string[]>(() => {
    if (!selectedSquad?.players) return [];
    
    // Handle different player formats (string or object)
    return selectedSquad.players.map(player => 
      typeof player === 'string' ? player : player.name
    );
  });
  
  const [newPlayerName, setNewPlayerName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Update form when selectedSquad changes
  useEffect(() => {
    if (selectedSquad) {
      setSquadName(selectedSquad.name || "");
      
      // Handle different player formats (string or object)
      const playerNames = selectedSquad.players.map(player => 
        typeof player === 'string' ? player : player.name
      );
      
      setSquadPlayersList(playerNames);
    }
  }, [selectedSquad]);

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