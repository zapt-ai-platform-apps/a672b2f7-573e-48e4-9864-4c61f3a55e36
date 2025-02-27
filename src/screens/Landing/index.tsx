import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import AnimatedBackground from './components/AnimatedBackground';
import { motion } from 'framer-motion';

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
    navigate('/sign-in');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 overflow-hidden">
      <AnimatedBackground />
      
      <motion.div 
        className="relative z-10 flex-grow flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <header className="container mx-auto px-6 py-6 flex justify-between items-center">
          <motion.div 
            className="flex items-center"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src="https://otebnzqfzytqyyjdfhzr.supabase.co/storage/v1/render/image/public/icons/a672b2f7-573e-48e4-9864-4c61f3a55e36/a07d10c7-40ae-490b-922a-cffd0ccb2aea.png?width=64&height=64" 
              alt="Football Subs Logo" 
              className="w-12 h-12 mr-3 drop-shadow-lg"
            />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-indigo-200">
              Football Subs
            </span>
          </motion.div>
          
          <motion.button
            className="px-5 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-white border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer shadow-lg"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGetStarted}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Sign In
          </motion.button>
        </header>
      
        <div className="container mx-auto px-4 py-8 md:py-16 flex flex-col items-center flex-grow">
          <HeroSection onGetStarted={handleGetStarted} />
          
          <motion.div
            id="features"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <FeaturesSection />
          </motion.div>
        </div>
      </motion.div>
      
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
      
      <motion.div 
        className="py-12 bg-indigo-900 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Ready to transform your game management?</h3>
              <p className="text-blue-200">Join coaches who are already using Football Subs</p>
            </div>
            
            <motion.button
              className="px-8 py-4 bg-white text-indigo-900 rounded-xl font-bold hover:bg-blue-100 transition-colors cursor-pointer shadow-lg"
              whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGetStarted}
            >
              Get Started Today
            </motion.button>
          </div>
        </div>
      </motion.div>
      
      <footer className="bg-indigo-950 text-white py-8 relative z-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div 
              className="flex items-center mb-6 md:mb-0"
              whileHover={{ scale: 1.05 }}
            >
              <img 
                src="https://otebnzqfzytqyyjdfhzr.supabase.co/storage/v1/render/image/public/icons/a672b2f7-573e-48e4-9864-4c61f3a55e36/a07d10c7-40ae-490b-922a-cffd0ccb2aea.png?width=48&height=48" 
                alt="Football Subs Logo" 
                className="w-8 h-8 mr-2"
              />
              <span className="text-lg font-bold">Football Subs</span>
            </motion.div>
            
            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
              <motion.a 
                href="#features" 
                className="text-blue-200 hover:text-white transition-colors"
                whileHover={{ x: 2 }}
              >
                Features
              </motion.a>
              <motion.a 
                href="/sign-in" 
                className="text-blue-200 hover:text-white transition-colors"
                whileHover={{ x: 2 }}
              >
                Sign In
              </motion.a>
              <motion.a 
                href="https://www.zapt.ai" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-200 hover:text-white transition-colors"
                whileHover={{ x: 2 }}
              >
                Made on ZAPT
              </motion.a>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-blue-800 text-center text-sm text-blue-300">
            © {new Date().getFullYear()} Football Subs. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}