import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/AuthProvider.jsx';
import HeroSection from './HeroSection.jsx';
import FeaturesSection from './FeaturesSection.jsx';

/**
 * LandingPage – the main entry page of the app.
 * When mounted, it logs its status and redirects signed‑in users.
 */
function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    console.log("LandingPage mounted");
    if (user) {
      navigate('/squads', { replace: true });
    }
  }, [user, navigate]);

  const handleGetStarted = () => {
    console.log("Get Started button clicked");
    navigate('/setup');
  };

  return (
    <div className="min-h-screen relative overflow-hidden animate-fadeIn">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 opacity-90 -z-10"></div>
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

export default LandingPage;