import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSquads } from '@/modules/squads/api';
import { Button } from '@/modules/ui/components/Button';
import { Card } from '@/modules/ui/components/Card';
import { useAuthContext } from '@/modules/auth/context/AuthProvider';

function SquadItem({ squad, onSelect }) {
  return (
    <Card className="mb-4 cursor-pointer hover:shadow-lg transition-shadow duration-300" onClick={() => onSelect(squad)}>
      <div className="flex justify-between items-center p-4">
        <div>
          <h3 className="text-xl font-semibold text-green-600">{squad.name}</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Created on {new Date(squad.createdAt).toLocaleDateString()}
          </p>
        </div>
        <Button variant="outline">Select</Button>
      </div>
    </Card>
  );
}

function CreateSquadForm({ onCreate, isOpen, setIsOpen }) {
  const [squadName, setSquadName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (squadName.trim()) {
      await onCreate(squadName);
      setSquadName('');
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Create New Squad</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="squadName" className="block text-gray-700 dark:text-gray-300 mb-2">
            Squad Name
          </label>
          <input
            type="text"
            id="squadName"
            value={squadName}
            onChange={(e) => setSquadName(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white box-border"
            placeholder="Enter squad name"
            required
          />
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="success" type="submit">
            Create Squad
          </Button>
        </div>
      </form>
    </div>
  );
}

function SquadsScreen() {
  const { squads, loading, error, createSquad } = useSquads();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { user, signOut } = useAuthContext();
  const navigate = useNavigate();

  const handleCreateSquad = async (name) => {
    try {
      const newSquad = await createSquad(name);
      navigate(`/squads/${newSquad.id}/players`);
    } catch (err) {
      console.error('Failed to create squad:', err);
    }
  };

  const handleSelectSquad = (squad) => {
    navigate(`/squads/${squad.id}/players`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">My Squads</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Welcome back, {user?.email}
            </p>
          </div>
          <div className="flex space-x-2">
            <Button onClick={() => setIsFormOpen(!isFormOpen)}>
              {isFormOpen ? 'Cancel' : 'Create Squad'}
            </Button>
            <Button variant="outline" onClick={signOut}>
              Sign Out
            </Button>
          </div>
        </div>

        <CreateSquadForm
          onCreate={handleCreateSquad}
          isOpen={isFormOpen}
          setIsOpen={setIsFormOpen}
        />

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {squads.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
              No Squads Yet
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Create your first squad to get started managing your team.
            </p>
            <Button
              variant="success"
              size="large"
              onClick={() => setIsFormOpen(true)}
            >
              Create Your First Squad
            </Button>
          </div>
        ) : (
          <div>
            {squads.map((squad) => (
              <SquadItem key={squad.id} squad={squad} onSelect={handleSelectSquad} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SquadsScreen;