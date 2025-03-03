import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from '@/app/screens/Landing/LandingPage.jsx';
import GameSetup from '@/app/screens/GameSetup/index.jsx';
import GameManagementScreen from '@/modules/game/ui/GameManagement/index.jsx';
import GameSummaryScreen from '@/modules/game/ui/GameSummaryScreen.jsx';
import NavBar from '@/app/components/NavBar.jsx';

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