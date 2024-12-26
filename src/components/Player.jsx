function Player(props) {
  const { player, handlePointerDown } = props;
  
  // Define different colors for goalkeeper and field players
  const playerColorClass = player.isGoalkeeper ? 'bg-red-500 dark:bg-red-700' : 'bg-blue-500 dark:bg-blue-700';

  return (
    <div
      class={`absolute cursor-pointer flex items-center justify-center ${playerColorClass} text-white rounded-full`}
      style={{
        top:
          player.position && player.position.y !== null
            ? `${player.position.y - 20}px`
            : '50%',
        left:
          player.position && player.position.x !== null
            ? `${player.position.x - 20}px`
            : '50%',
        width: '40px',
        height: '40px',
        transform: 'translate(-50%, -50%)',
      }}
      onPointerDown={(e) => handlePointerDown(e, player)}
    >
      {player.isGoalkeeper ? 'GK' : player.name.charAt(0)}
    </div>
  );
}

export default Player;