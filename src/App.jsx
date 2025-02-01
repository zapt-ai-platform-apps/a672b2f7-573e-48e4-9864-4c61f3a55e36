import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import GameSetup from './components/GameSetup';
import GameManagement from './components/GameManagement';
import GameSummary from './components/GameSummary';
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