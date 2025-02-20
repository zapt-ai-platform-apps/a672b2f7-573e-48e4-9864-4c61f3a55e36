import { useState, ChangeEvent, FormEvent } from "react";

function useEditSquadForm() {
  const [squadName, setSquadName] = useState<string>("My Squad");
  const [squadPlayersList, setSquadPlayersList] = useState<string[]>([]);
  const [newPlayerName, setNewPlayerName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleAddPlayer = () => {
    if (!newPlayerName.trim()) return;
    setSquadPlayersList([...squadPlayersList, newPlayerName.trim()]);
    setNewPlayerName("");
  };

  const handleDeletePlayer = (index: number) => {
    setSquadPlayersList(squadPlayersList.filter((_, idx) => idx !== index));
  };

  const handleUpdateSquad = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setError("");
      console.log("Squad updated:", { squadName, squadPlayersList });
    } catch (err) {
      setError("Update failed");
    }
    setLoading(false);
  };

  const handleBack = () => {
    console.log("Navigating back");
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