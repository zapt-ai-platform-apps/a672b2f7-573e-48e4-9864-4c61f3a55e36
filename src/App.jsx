import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './screens/LandingPage';
import GameSetup from './screens/GameSetup';
import GameManagementScreen from './features/GameManagement/GameManagementScreen';
import GameSummaryScreen from './features/GameSummary/GameSummaryScreen';
import NavBar from './components/NavBar';

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