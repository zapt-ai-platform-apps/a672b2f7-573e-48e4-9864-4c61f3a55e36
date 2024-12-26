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
  const centerY = pitchRect.height / 2;
  const verticalSpacing = pitchRect.height / (totalPlayers + 1);
  
  playersWithoutPosition.forEach((player, index) => {
    const assignedPlayer = playerData().find((p) => p.name === player.name);
    if (assignedPlayer && (!assignedPlayer.position || assignedPlayer.position.x === null || assignedPlayer.position.y === null)) {
      setPlayerData(
        playerData().map((p) => {
          if (p.name === assignedPlayer.name) {
            return {
              ...p,
              position: {
                x: spacing * (index + 1),
                y: centerY + ((index % 2 === 0 ? 1 : -1) * (verticalSpacing / 2)),
              },
            };
          }
          return p;
        })
      );
    }
  });
}