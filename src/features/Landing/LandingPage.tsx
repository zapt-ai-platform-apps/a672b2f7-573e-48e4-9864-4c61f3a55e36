import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/AuthProvider';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';

export default function LandingPage(): JSX.Element {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/squads', { replace: true });
    }
  }, [user, navigate]);

  const handleGetStarted = () => {
    navigate('/setup');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 opacity-90 -z-10"></div>
      <div className="min-h-screen flex flex-col justify-center items-center p-8">
        <HeroSection onGetStarted={handleGetStarted} />
        <FeaturesSection />
        <footer className="absolute bottom-4 right-4">
          <a
            href="https://www.zapt.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white underline cursor-pointer"
          >
            Made on ZAPT
          </a>
        </footer>
      </div>
    </div>
  );
}