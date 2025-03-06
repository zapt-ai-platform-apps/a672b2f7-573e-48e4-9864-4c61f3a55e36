import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSquads } from '@/modules/squads/api';
import { Button } from '@/modules/ui/components/Button';
import { Card } from '@/modules/ui/components/Card';
import { useAuthContext } from '@/modules/auth/context/AuthProvider';
import * as Sentry from '@sentry/browser';

function SquadItem({ squad, onSelect }) {
  return (
    <Card 
      className="mb-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={() => onSelect(squad)}
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-center p-4">
        <div className="mb-3 md:mb-0">
          <h3 className="text-lg md:text-xl font-semibold text-green-600">{squad.name}</h3>
          <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm">
            Created on {new Date(squad.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </Card>
  );
}

function CreateSquadForm({ onCreate, isOpen, setIsOpen }) {
  const [squadName, setSquadName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (squadName.trim() && !isSubmitting) {
      try {
        setIsSubmitting(true);
        await onCreate(squadName);
        setSquadName('');
      } catch (err) {
        console.error('Error creating squad:', err);
        Sentry.captureException(err);
      } finally {
        setIsSubmitting(false);
        setIsOpen(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg md:text-xl font-semibold mb-4 text-gray-800 dark:text-white">Create New Squad</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="squadName" className="block text-gray-700 dark:text-gray-300 mb-2 text-sm md:text-base">
            Squad Name
          </label>
          <input
            type="text"
            id="squadName"
            value={squadName}
            onChange={(e) => setSquadName(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white box-border text-sm md:text-base"
            placeholder="Enter squad name"
            required
          />
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-end sm:space-x-2 space-y-2 sm:space-y-0">
          <Button 
            variant="outline" 
            onClick={() => setIsOpen(false)}
            className="cursor-pointer"
            size="small"
          >
            Cancel
          </Button>
          <Button 
            variant="success" 
            type="submit" 
            disabled={!squadName.trim() || isSubmitting}
            className="cursor-pointer"
            size="small"
          >
            {isSubmitting ? 'Creating...' : 'Create Squad'}
          </Button>
        </div>
      </form>
    </div>
  );
}

function SquadsScreen() {
  const { squads, loading, error, createSquad } = useSquads();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleCreateSquad = async (name) => {
    try {
      const newSquad = await createSquad(name);
      navigate(`/squads/${newSquad.id}/players`);
    } catch (err) {
      console.error('Failed to create squad:', err);
      Sentry.captureException(err);
      throw err;
    }
  };

  const handleSelectSquad = (squad) => {
    navigate(`/squads/${squad.id}/players`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 md:mb-8">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">My Squads</h1>
            <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
              Welcome back, {user?.email}
            </p>
          </div>
          <div>
            <Button onClick={() => setIsFormOpen(!isFormOpen)} size="small" className="cursor-pointer">
              {isFormOpen ? 'Cancel' : 'Create Squad'}
            </Button>
          </div>
        </div>

        <CreateSquadForm
          onCreate={handleCreateSquad}
          isOpen={isFormOpen}
          setIsOpen={setIsFormOpen}
        />

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        {squads.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 md:p-8 text-center">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
              No Squads Yet
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm md:text-base">
              Create your first squad to get started managing your team.
            </p>
            <Button 
              variant="success" 
              size="large" 
              onClick={() => setIsFormOpen(true)}
              className="cursor-pointer"
            >
              Create Your First Squad
            </Button>
          </div>
        ) : (
          <div>
            {squads.map((squad) => (
              <SquadItem 
                key={squad.id} 
                squad={squad} 
                onSelect={handleSelectSquad}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SquadsScreen;