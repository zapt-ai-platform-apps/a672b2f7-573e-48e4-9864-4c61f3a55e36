import GameManagementMain from './GameManagementMain';
import Footer from './Footer';

function GameManagementContent(props) {
  return (
    <div class="min-h-screen flex flex-col text-gray-800">
      <GameManagementMain {...props} />
      <Footer />
    </div>
  );
}

export default GameManagementContent;