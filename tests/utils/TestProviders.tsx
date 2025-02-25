import React from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthContext } from '../../src/context/AuthContext';

interface TestProvidersProps {
  authContextValue: {
    session: any;
    loading: boolean;
    signOut: () => void;
  };
  children: React.ReactNode;
  initialEntries?: string[];
  path?: string;
}

const TestProviders = ({
  authContextValue,
  children,
  initialEntries = ['/protected'],
  path = '/protected'
}: TestProvidersProps) => {
  return (
    <AuthContext.Provider value={authContextValue}>
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path={path} element={children} />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>
  );
};

export default TestProviders;