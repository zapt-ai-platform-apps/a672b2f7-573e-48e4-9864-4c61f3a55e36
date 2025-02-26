import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import ErrorBoundary from './components/ErrorBoundary';
import StateProvider from './components/StateProvider';

function App() {
  return (
    <div className="min-h-screen h-full text-white bg-gradient-to-br from-purple-900 via-blue-800 to-indigo-900">
      <Router>
        <ErrorBoundary>
          <StateProvider>
            <AppRoutes />
          </StateProvider>
        </ErrorBoundary>
      </Router>
      <footer className="fixed bottom-0 inset-x-0 p-2 text-center text-xs bg-white/20 backdrop-blur-sm z-10">
        <a
          href="https://www.zapt.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer text-white hover:text-gray-100 transition-colors"
        >
          Made on ZAPT
        </a>
      </footer>
    </div>
  );
}

export default App;