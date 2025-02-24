import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';

export default function LandingScreen(): JSX.Element {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session) {
      navigate('/squads');
    }
  }, [session, navigate]);

  const handleGetStarted = () => {
    if (isLoading) return;
    setIsLoading(true);
    navigate('/login');
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center overflow-hidden bg-gradient-to-br from-purple-900 via-blue-800 to-indigo-900">
      {/* Animated SVG Wave Background */}
      <div className="absolute inset-0 w-full h-full z-0 opacity-20">
        <div className="absolute top-0 left-0 w-full overflow-hidden">
          <svg 
            className="absolute w-full h-[800px] animate-wave-slow" 
            viewBox="0 0 1440 320" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              fill="#ffffff" 
              fillOpacity="0.6" 
              d="M0,192L48,165.3C96,139,192,85,288,80C384,75,480,117,576,144C672,171,768,181,864,165.3C960,149,1056,107,1152,106.7C1248,107,1344,149,1392,170.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
          <svg 
            className="absolute w-full h-[600px] animate-wave" 
            viewBox="0 0 1440 320" 
            xmlns="http://www.w3.org/2000/svg"
            style={{animationDelay: "-2s"}}
          >
            <path 
              fill="#ffffff" 
              fillOpacity="0.4" 
              d="M0,256L48,229.3C96,203,192,149,288,122.7C384,96,480,96,576,133.3C672,171,768,245,864,266.7C960,288,1056,256,1152,229.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full px-4 py-20 max-w-7xl mx-auto">
        <HeroSection onGetStarted={handleGetStarted} />
        <FeaturesSection />
      </div>
    </div>
  );
}