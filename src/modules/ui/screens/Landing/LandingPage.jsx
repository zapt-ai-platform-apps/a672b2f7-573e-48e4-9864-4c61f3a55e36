import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/modules/ui/components/Button';
import { useAuthContext } from '@/modules/auth/context/AuthProvider';

function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  // Automatically redirect authenticated users to squads
  useEffect(() => {
    if (user) {
      navigate('/squads');
    }
  }, [user, navigate]);

  const handleGetStarted = () => {
    if (user) {
      navigate('/squads');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50 to-brand-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-screen">
        <div className="text-center max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <img
              src="https://otebnzqfzytqyyjdfhzr.supabase.co/storage/v1/render/image/public/icons/a672b2f7-573e-48e4-9864-4c61f3a55e36/a07d10c7-40ae-490b-922a-cffd0ccb2aea.png?width=512&height=512"
              alt="Football Subs Logo"
              className="w-24 h-24 md:w-32 md:h-32 animate-pulse-slow"
            />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
            Football <span className="text-brand-500">Subs</span>
          </h1>
          
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Help your team succeed with fair play time for all players. Easily manage substitutions, track playtime, and keep games running smoothly.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Button 
              onClick={handleGetStarted}
              size="large"
              variant="primary"
              className="px-8 py-4 text-lg font-medium shadow-md hover:shadow-lg transform transition hover:-translate-y-1"
            >
              {user ? 'Manage My Teams' : 'Get Started'}
            </Button>
          </div>
        </div>
        
        <div className="mt-16 md:mt-20 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md text-center">
            <div className="text-brand-500 mb-4 flex justify-center">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Fair Playtime</h3>
            <p className="text-gray-600 dark:text-gray-300">Track player playtime to ensure everyone gets equal opportunities on the field.</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md text-center">
            <div className="text-brand-500 mb-4 flex justify-center">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Easy Substitutions</h3>
            <p className="text-gray-600 dark:text-gray-300">Manage player rotations with just a few taps for seamless game flow.</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md text-center">
            <div className="text-brand-500 mb-4 flex justify-center">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Match Stats</h3>
            <p className="text-gray-600 dark:text-gray-300">Track goals, view player positions, and share detailed match summaries.</p>
          </div>
        </div>

        <div className="mt-20 text-center text-gray-500 dark:text-gray-400 text-sm">
          <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer" className="hover:text-brand-500 dark:hover:text-brand-400">
            Made on ZAPT
          </a>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;