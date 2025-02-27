import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Squad } from '../../features/SquadManagement/types';
import SquadList from '../../features/SquadManagement/components/SquadList';
import useSquadManagement from '../../hooks/useSquadManagement';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';

const SquadListView: React.FC = () => {
  const navigate = useNavigate();
  const { 
    squads, 
    loading, 
    error,
    fetchSquads,
    deleteSquad
  } = useSquadManagement();
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchSquads();
  }, [fetchSquads]);

  const handleCreateSquad = () => {
    navigate('/squads/create');
  };

  const handleEditSquad = (id: number) => {
    navigate(`/squads/edit/${id}`);
  };

  const handleDeleteSquad = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this squad?')) {
      setIsDeleting(true);
      try {
        await deleteSquad(id);
        await fetchSquads();
      } catch (error) {
        console.error('Failed to delete squad:', error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleSelectSquad = (id: number) => {
    navigate(`/game-setup/${id}`);
  };

  if (loading || isDeleting) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Squads</h1>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded shadow transition-colors duration-200 cursor-pointer"
          onClick={handleCreateSquad}
        >
          Create New Squad
        </button>
      </div>
      <SquadList
        squads={squads}
        onEditSquad={handleEditSquad}
        onDeleteSquad={handleDeleteSquad}
        onSelectSquad={handleSelectSquad}
      />
    </div>
  );
};

export default SquadListView;