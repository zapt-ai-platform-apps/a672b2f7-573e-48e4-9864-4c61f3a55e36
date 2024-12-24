function Player(props) {
  return (
    <div
      class="absolute cursor-pointer flex items-center justify-center bg-blue-500 text-white rounded-full"
      style={{
        top:
          props.player.position && props.player.position.y !== null
            ? `${props.player.position.y - 20}px`
            : '50%',
        left:
          props.player.position && props.player.position.x !== null
            ? `${props.player.position.x - 20}px`
            : '50%',
        width: '40px',
        height: '40px',
        transform: 'translate(-50%, -50%)',
      }}
      onMouseDown={(e) => props.handleMouseDown(e, props.player)}
      onTouchStart={(e) => props.handleTouchStart(e, props.player)}
    >
      {props.player.isGoalkeeper ? 'GK' : props.player.name.charAt(0)}
    </div>
  );
}

export default Player;