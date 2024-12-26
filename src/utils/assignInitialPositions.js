import { playerData, setPlayerData } from '../state';

export default function assignInitialPositions(pitchRef) {
  const onField = playerData().filter((player) => player.isOnField);
  const playersWithoutPosition = onField.filter(
    (player) => !player.position || player.position.x === null || player.position.y === null
  );

  if (playersWithoutPosition.length === 0) return;

  const pitchRect = pitchRef.getBoundingClientRect();
  const totalPlayers = onField.length;
  const spacing = pitchRect.width / (totalPlayers + 1);

  playersWithoutPosition.forEach((player, index) => {
    const assignedPlayer = playerData().find((p) => p.name === player.name);
    if (assignedPlayer && !assignedPlayer.position) {
      setPlayerData(
        playerData().map((p) => {
          if (p.name === assignedPlayer.name) {
            return {
              ...p,
              position: {
                x: spacing * (index + 1),
                y: pitchRect.height / 2,
              },
            };
          }
          return p;
        })
      );
    }
  });
}