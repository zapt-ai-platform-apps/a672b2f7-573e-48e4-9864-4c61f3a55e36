import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/AuthProvider.jsx';
import LandingPage from './LandingPage.jsx';

const LandingScreen = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/squads', { replace: true });
    }
  }, [user, navigate]);

  return <LandingPage />;
};

export default LandingScreen;