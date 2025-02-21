import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Squad {
  id?: string | number;
  name: string;
  players?: any[];
}

interface SquadListProps {
  squads: Squad[];
  loading: boolean;
  handleSelectSquad: (squad: Squad) => void;
  handleEditSquad: (squad: Squad) => void;
}

export default function SquadList({ squads = [], loading, handleSelectSquad, handleEditSquad }: SquadListProps): JSX.Element {
  const navigate = useNavigate();

  if (loading) {
    return <p>Loading squads...</p>;
  }

  if (!loading && squads.length === 0) {
    return <p>No squads found. Please create a new squad.</p>;
  }

  return (
    <div>
      <ul>
        {squads.map((squad, index) => (
          <li key={index} className="flex justify-between items-center border-b py-2">
            <span>{squad.name}</span>
            <div>
              <button
                type="button"
                onClick={() => {
                  handleSelectSquad(squad);
                  navigate('/setup/participants');
                }}
                className="mr-2 px-3 py-1 bg-blue-500 text-white rounded cursor-pointer"
              >
                Select
              </button>
              <button
                type="button"
                onClick={() => handleEditSquad(squad)}
                className="px-3 py-1 bg-yellow-500 text-white rounded cursor-pointer"
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}