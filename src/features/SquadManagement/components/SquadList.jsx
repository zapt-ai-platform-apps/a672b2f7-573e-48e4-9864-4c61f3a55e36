import React from 'react';
import { useNavigate } from 'react-router-dom';

function SquadList({ squads = [], loading, handleSelectSquad, handleEditSquad }) {
  const navigate = useNavigate();
  return (
    <div>
      {loading ? (
        <p>Loading squads...</p>
      ) : (
        <ul>
          {squads.map((squad, index) => (
            <li key={index} className="flex justify-between items-center border-b py-2">
              <span>{squad.name}</span>
              <div>
                <button
                  type="button"
                  onClick={() => {
                    handleSelectSquad(squad);
                    navigate('/setup');
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
      )}
    </div>
  );
}

export default SquadList;