export interface ExtendedPlayer {
  id: string;
  isInMatchSquad: boolean;
  name: string;
}

const useGameSetupParticipantsHandlers = (
  selectedMatchPlayers: ExtendedPlayer[],
  setSelectedSquad: (players: ExtendedPlayer[]) => void,
  navigate: (path: string | number) => void,
  setErrorMessage: (message: string) => void
) => {
  const handleNext = () => {
    if (selectedMatchPlayers.length === 0) {
      setErrorMessage('Please select at least one participant.');
    } else {
      setSelectedSquad(selectedMatchPlayers);
      navigate('/next-setup');
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return { handleNext, handleBack };
};

export default useGameSetupParticipantsHandlers;