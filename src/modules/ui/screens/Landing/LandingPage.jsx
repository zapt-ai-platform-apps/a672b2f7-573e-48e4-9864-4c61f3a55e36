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
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="flex-grow flex flex-col justify-center items-center bg-gradient-to-br from-green-100 to-blue-100 dark:from-gray-800 dark:to-gray-900 p-4 md:p-8">
        <img
          src="https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjQ4Nzh8MHwxfHNlYXJjaHwxfHxBJTIwZm9vdGJhbGwlMjBpY29uJTIwd2l0aCUyMHN1YnN0aXR1dGlvbnMlMjBhcnJvd3N8ZW58MHx8fHwxNzMxMDE4MjY2fDA&ixlib=rb-4.0.3&q=80&w=1080"
          alt="Football Subs Logo"
          className="w-24 h-24 md:w-32 md:h-32 mb-6 md:mb-8"
        />
        <h1 className="text-3xl md:text-5xl font-bold text-green-600 mb-6 md:mb-8 text-center">Football Subs</h1>
        <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-8 text-center max-w-xl px-4">
          Manage your team's substitutions effortlessly and ensure fair playtime for all players.
        </p>
        <div className="w-full px-6 md:w-auto flex justify-center">
          <Button 
            variant="success" 
            size="large" 
            onClick={handleGetStarted}
            className="px-8 py-4 md:px-12 md:py-6 text-xl md:text-2xl w-full md:w-auto"
          >
            {user ? 'My Squads' : 'Sign In'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;