function TeamSelection(props) {
  const { setTeam, setConfirmOpponentGoal } = props;

  const handleTeamSelection = (selectedTeam) => {
    setTeam(selectedTeam);
    if (selectedTeam === 'opponent') {
      setConfirmOpponentGoal(true);
    }
  };

  return (
    <div>
      <p className="mb-4 text-lg">Which team scored?</p>
      <div className="flex space-x-4">
        <button
          className="flex-1 px-6 py-3 bg-green-500 text-white text-lg rounded-lg cursor-pointer hover:bg-green-600 transition duration-300 ease-in-out"
          onClick={() => handleTeamSelection('our')}
        >
          Our Team
        </button>
        <button
          className="flex-1 px-6 py-3 bg-red-500 text-white text-lg rounded-lg cursor-pointer hover:bg-red-600 transition duration-300 ease-in-out"
          onClick={() => handleTeamSelection('opponent')}
        >
          Opponent Team
        </button>
      </div>
    </div>
  );
}

export default TeamSelection;