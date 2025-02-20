import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { runGetStarted } from '../../services/landingService';
import FeaturesSection from './FeaturesSection';
import HeroSection from './HeroSection';

function LandingScreen(): JSX.Element {
  const navigate = useNavigate();
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  const handleGetStarted = async () => {
    if (isButtonDisabled) return;
    await runGetStarted(navigate, setIsButtonDisabled);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <header className="text-center p-8">
        <h1 className="text-5xl font-extrabold mb-4">Football Subs</h1>
        <p className="text-xl mb-8">
          Elevate your football substitution experience with style and precision.
        </p>
        <button
          onClick={handleGetStarted}
          disabled={isButtonDisabled}
          className="cursor-pointer bg-white text-blue-600 font-bold py-3 px-6 rounded-full shadow-lg transform transition hover:scale-105 disabled:opacity-50"
        >
          Get Started
        </button>
      </header>
      <section className="flex-1 flex flex-col justify-center items-center p-4">
        <HeroSection onGetStarted={handleGetStarted} />
        <FeaturesSection />
      </section>
      <footer className="w-full p-4 text-center">
        <a
          href="https://www.zapt.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer underline font-medium"
        >
          Made on ZAPT
        </a>
      </footer>
    </div>
  );
}

export default LandingScreen;