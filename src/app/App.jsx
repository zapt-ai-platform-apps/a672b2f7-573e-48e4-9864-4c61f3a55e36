import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from '@/app/screens/Landing/LandingPage.jsx';
import GameSetup from '@/screens/GameSetup';
import GameManagementScreen from '@/features/GameManagement/GameManagementScreen.jsx';
import GameSummaryScreen from '@/features/GameSummary/GameSummaryScreen.jsx';
import NavBar from '@/shared/components/NavBar.jsx';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/setup" element={<GameSetup />} />
        <Route path="/manage" element={<GameManagementScreen />} />
        <Route path="/summary" element={<GameSummaryScreen />} />
      </Routes>
    </>
  );
}

export default App;