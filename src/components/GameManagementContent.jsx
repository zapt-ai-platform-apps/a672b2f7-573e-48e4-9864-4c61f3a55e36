import GameManagementMain from './GameManagementMain';

function GameManagementContent(props) {
  return (
    <div class="min-h-screen flex flex-col text-gray-800">
      <GameManagementMain {...props} />
    </div>
  );
}

export default GameManagementContent;