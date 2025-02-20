import React, { ChangeEvent } from "react";
import useEditSquadForm from "./hooks/useEditSquadForm";
import PlayersManager from "./components/PlayersManager";

function EditSquadForm() {
  const {
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
  } = useEditSquadForm();

  return (
    <div className="min-h-screen h-full flex flex-col items-center justify-center p-8">
      <button
        onClick={handleBack}
        className="mb-4 px-4 py-2 bg-gray-300 rounded cursor-pointer"
      >
        Back
      </button>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Squad</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleUpdateSquad} className="w-full max-w-md h-full">
        <div className="mb-4">
          <label className="block text-lg mb-2 text-gray-800">Squad Name</label>
          <input
            type="text"
            value={squadName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSquadName(e.target.value)}
            className="w-full p-2 border rounded box-border text-gray-800"
          />
        </div>
        <PlayersManager
          squadPlayersList={squadPlayersList}
          newPlayerName={newPlayerName}
          setNewPlayerName={setNewPlayerName}
          handleAddPlayer={handleAddPlayer}
          handleDeletePlayer={handleDeletePlayer}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-green-500 text-white rounded disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Updating..." : "Update Squad"}
        </button>
      </form>
    </div>
  );
}

export default EditSquadForm;