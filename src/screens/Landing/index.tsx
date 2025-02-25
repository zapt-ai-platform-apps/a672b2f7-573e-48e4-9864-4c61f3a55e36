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
    <div className="min-h-screen relative flex flex-col items-center overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-900 to-blue-900">
      <div className="absolute inset-0 w-full h-full z-0">
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-white opacity-10"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                animation: `float ${Math.random() * 10 + 15}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            ></div>
          ))}
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg 
            className="relative block w-full h-[150px] overflow-hidden"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
              fill="rgba(255,255,255,0.05)" 
              fillOpacity="1"
              className="animate-wave-slow"
            ></path>
            <path 
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
              fill="rgba(255,255,255,0.1)" 
              fillOpacity="1"
              className="animate-wave"
            ></path>
          </svg>
        </div>
      </div>
      <div className="absolute inset-0 bg-radial-gradient z-0"></div>
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <HeroSection onGetStarted={handleGetStarted} />
        <FeaturesSection />
      </div>
      <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-black/30 to-transparent"></div>
      <a 
        href="https://www.zapt.ai" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-white hover:bg-white/20 transition-all duration-300 border border-white/20 z-20"
      >
        Made on ZAPT
      </a>
    </div>
  );
}