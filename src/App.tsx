import React from 'react';
import { AuthProvider } from './components/AuthProvider';
import LandingPage from './screens/Landing/index';

function App(): JSX.Element {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow">
          <LandingPage />
        </div>
        <footer className="bg-gray-800 text-white text-center py-2">
          <a
            href="https://www.zapt.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer underline"
          >
            Made on ZAPT
          </a>
        </footer>
      </div>
    </AuthProvider>
  );
}

export default App;