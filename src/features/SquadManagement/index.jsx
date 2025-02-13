import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../state';
import Loading from '../../components/Loading.jsx';
import CreateSquadForm from './CreateSquadForm.jsx';

function SquadSelectionScreen() {
  const navigate = useNavigate();
  const { setSelectedSquad } = useStateContext();
  const [squads, setSquads] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadSquads() {
      try {
        const { fetchSquads } = await import('./hooks/useSquadManagementService.js');
        const data = await fetchSquads();
        setSquads(data);
        if (data.length === 0) {
          navigate('/squads/new', { replace: true });
        }
      } catch (error) {
        console.error('Error loading squads:', error);
      } finally {
        setLoading(false);
      }
    }
    loadSquads();
  }, [navigate]);

  const handleSelect = (squad) => {
    setSelectedSquad(squad);
    navigate('/squads/options');
  };

  const handleCreateNew = () => {
    navigate('/squads/new');
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen p-8 bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <h1 className="text-4xl font-bold mb-8 text-brand-500">Your Squads</h1>
      <div className="mb-8">
        {squads.map((squad) => (
          <div
            key={squad.id}
            onClick={() => handleSelect(squad)}
            className="p-4 mb-4 border rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <h2 className="text-2xl font-semibold">{squad.name}</h2>
          </div>
        ))}
      </div>
      <button
        onClick={handleCreateNew}
        className="px-6 py-3 bg-green-500 text-white text-lg rounded-md cursor-pointer hover:bg-green-600 transition-colors"
      >
        Create New Squad
      </button>
    </div>
  );
}

function SquadOptionsScreen() {
  const navigate = useNavigate();
  const { selectedSquad } = useStateContext();

  if (!selectedSquad) {
    navigate('/squads', { replace: true });
    return null;
  }

  const handleSetupGame = () => {
    navigate('/setup');
  };

  const handleEditSquad = () => {
    navigate('/squads/edit');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-8">
      <h1 className="text-4xl font-bold mb-8">{selectedSquad.name}</h1>
      <p className="text-xl mb-8">What would you like to do?</p>
      <div className="flex space-x-8">
        <button
          onClick={handleSetupGame}
          className="px-8 py-4 bg-blue-500 text-white text-lg rounded-md cursor-pointer hover:bg-blue-600 transition-colors"
        >
          Set up for a Game
        </button>
        <button
          onClick={handleEditSquad}
          className="px-8 py-4 bg-yellow-500 text-white text-lg rounded-md cursor-pointer hover:bg-yellow-600 transition-colors"
        >
          Edit Squad
        </button>
      </div>
    </div>
  );
}

function CreateSquadScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 p-8 text-gray-800 dark:text-white">
      <button
        onClick={() => navigate('/squads')}
        className="self-start mb-4 px-4 py-2 bg-gray-300 rounded-md cursor-pointer hover:bg-gray-400"
      >
        Back
      </button>
      <h1 className="text-4xl font-bold mb-8">Create New Squad</h1>
      <CreateSquadForm />
    </div>
  );
}

export { SquadSelectionScreen, SquadOptionsScreen, CreateSquadScreen };