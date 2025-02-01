import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './screens/LandingPage';
import GameSetup from './screens/GameSetup';
import GameManagement from './screens/GameManagement';
import GameSummary from './screens/GameSummary';
import NavBar from './components/NavBar';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/setup" element={<GameSetup />} />
        <Route path="/manage" element={<GameManagement />} />
        <Route path="/summary" element={<GameSummary />} />
      </Routes>
    </>
  );
}

export default App;