import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import AnimatedBackground from './components/AnimatedBackground';
import NavBar from '../../components/navigation/NavBar';

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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
      <AnimatedBackground />
      
      <div className="relative z-10 flex-grow flex flex-col">
        <div className="container mx-auto px-4 py-12 md:py-24 flex flex-col items-center">
          <HeroSection onGetStarted={handleGetStarted} />
          <FeaturesSection />
        </div>
      </div>
      
      <div className="relative w-full overflow-hidden">
        <svg className="w-full h-24 md:h-32" viewBox="0 0 1440 200" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M0,160L48,154.7C96,149,192,139,288,138.7C384,139,480,149,576,149.3C672,149,768,139,864,144C960,149,1056,171,1152,170.7C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" 
            className="fill-blue-800/30 animate-wave-slow"
          />
          <path 
            d="M0,192L48,181.3C96,171,192,149,288,133.3C384,117,480,107,576,112C672,117,768,139,864,160C960,181,1056,203,1152,197.3C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" 
            className="fill-indigo-800/40 animate-wave" 
            style={{ animationDelay: '0.5s' }}
          />
        </svg>
      </div>
      
      <a 
        href="https://www.zapt.ai" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-white hover:bg-white/20 transition-all duration-300 border border-white/20 z-50"
      >
        Made on ZAPT
      </a>
    </div>
  );
}