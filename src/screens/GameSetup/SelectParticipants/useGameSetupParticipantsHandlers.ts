import { NavigateFunction } from 'react-router-dom';

export default function useGameSetupParticipantsHandlers(
  selectedMatchPlayers: any[],
  setSelectedSquad: (players: any[]) => void,
  navigate: NavigateFunction,
  setErrorMessage: (msg: string) => void
) {
  function handleNext() {
    if (selectedMatchPlayers.length === 0) {
      setErrorMessage('Please select at least one participant.');
      return;
    }
    setErrorMessage('');
    setSelectedSquad(selectedMatchPlayers);
    navigate('/game-setup/config');
  }

  function handleBack() {
    navigate(-1);
  }

  return {
    handleNext,
    handleBack,
  };
}