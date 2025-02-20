import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './screens/Landing';

function App() {
  return (
    <div className="min-h-screen h-full text-gray-900">
      <Router>
        <Routes>
          <Route path="/*" element={<LandingPage />} />
        </Routes>
      </Router>
      <footer className="p-4 text-center">
        <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer" className="cursor-pointer">
          Made on ZAPT
        </a>
      </footer>
    </div>
  );
}

export default App;