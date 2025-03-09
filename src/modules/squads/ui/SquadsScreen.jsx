import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSquads } from '@/modules/squads/api';
import { Button } from '@/modules/ui/components/Button';
import { Card } from '@/modules/ui/components/Card';
import { useAuthContext } from '@/modules/auth/context/AuthProvider';
import * as Sentry from '@sentry/browser';
import { HiOutlinePencil, HiOutlineUserGroup, HiOutlineChevronRight } from 'react-icons/hi';

function SquadItem({ squad, onSelect }) {
  return (
    <Card 
      className="mb-4 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 cursor-pointer border border-gray-200 dark:border-gray-700"
      onClick={() => onSelect(squad)}
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <div className="mb-3 md:mb-0">
          <h3 className="text-xl font-semibold text-brand-500 dark:text-brand-400 flex items-center">
            <HiOutlineUserGroup className="mr-2" /> {squad.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            Created on {new Date(squad.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center text-gray-500 dark:text-gray-400">
          <span className="mr-2">View squad</span>
          <HiOutlineChevronRight />
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
    <Card className="mb-6 border border-brand-200 dark:border-brand-800 bg-brand-50 dark:bg-gray-800">
      <form onSubmit={handleSubmit}>
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Create New Squad</h3>
        <div className="mb-4">
          <label htmlFor="squadName" className="block text-gray-700 dark:text-gray-300 mb-2 text-sm font-medium">
            Squad Name
          </label>
          <input
            type="text"
            id="squadName"
            value={squadName}
            onChange={(e) => setSquadName(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-400 dark:bg-gray-700 dark:text-white box-border"
            placeholder="Enter squad name"
            required
            autoFocus
          />
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3">
          <Button 
            variant="secondary" 
            onClick={() => setIsOpen(false)}
            className="cursor-pointer"
            size="medium"
            type="button"
          >
            Cancel
          </Button>
          <Button 
            variant="primary" 
            type="submit" 
            disabled={!squadName.trim() || isSubmitting}
            className="cursor-pointer"
            size="medium"
          >
            {isSubmitting ? 'Creating...' : 'Create Squad'}
          </Button>
        </div>
      </form>
    </Card>
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
      <div className="page-container flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="content-container">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">My Squads</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your football teams in one place
            </p>
          </div>
          <Button 
            onClick={() => setIsFormOpen(!isFormOpen)} 
            variant={isFormOpen ? "secondary" : "primary"}
            size="medium" 
            className="cursor-pointer flex items-center"
          >
            {isFormOpen ? 'Cancel' : (
              <>
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Create Squad
              </>
            )}
          </Button>
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
          <Card className="text-center p-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center">
                <HiOutlineUserGroup className="w-8 h-8 text-brand-500 dark:text-brand-400"/>
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
              No Squads Yet
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              Create your first squad to start managing your team, track player playtime, and run smoother games.
            </p>
            <Button 
              variant="primary" 
              size="large" 
              onClick={() => setIsFormOpen(true)}
              className="cursor-pointer shadow-md"
            >
              Create Your First Squad
            </Button>
          </Card>
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