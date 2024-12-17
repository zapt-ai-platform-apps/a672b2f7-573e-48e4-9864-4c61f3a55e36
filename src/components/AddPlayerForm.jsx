function AddPlayerForm(props) {
  const { playerName, setPlayerName, handleAddPlayer } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddPlayer();
  };

  return (
    <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md mb-8">
      <h2 class="text-2xl font-bold mb-4 text-green-600">Add Players</h2>
      <form onSubmit={handleSubmit} class="flex flex-col sm:flex-row">
        <input
          type="text"
          class="sm:flex-1 p-4 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:rounded-l-lg rounded-t-lg sm:rounded-tr-none sm:rounded-bl-lg focus:outline-none focus:ring-2 focus:ring-green-400 box-border text-lg"
          placeholder="Player Name"
          value={playerName()}
          onInput={(e) => setPlayerName(e.target.value)}
        />
        <button
          type="submit"
          class="sm:px-8 px-4 py-4 bg-green-500 text-white text-lg sm:rounded-r-lg rounded-b-lg sm:rounded-bl-none cursor-pointer hover:bg-green-600 hover:scale-105 transition duration-300 ease-in-out sm:mt-0 mt-2"
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default AddPlayerForm;