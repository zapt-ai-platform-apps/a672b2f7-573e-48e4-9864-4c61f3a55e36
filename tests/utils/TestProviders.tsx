import React, { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../src/context/AuthContext';
import { StateContext } from '../../src/context/StateContext';

interface TestProvidersProps {
  children: ReactNode;
  authContextValue?: {
    session: any;
    loading: boolean;
    signOut: () => void;
  };
  stateContextValue?: any;
  initialEntries?: string[];
  initialIndex?: number;
}

/**
 * TestProviders component for wrapping test components with necessary context providers
 */
function TestProviders({ 
  children, 
  authContextValue = { session: null, loading: false, signOut: () => {} },
  stateContextValue = { state: {}, dispatch: () => {} },
  initialEntries = ['/'],
  initialIndex = 0
}: TestProvidersProps): JSX.Element {
  return (
    <MemoryRouter initialEntries={initialEntries} initialIndex={initialIndex}>
      <AuthContext.Provider value={authContextValue}>
        <StateContext.Provider value={stateContextValue}>
          {children}
        </StateContext.Provider>
      </AuthContext.Provider>
    </MemoryRouter>
  );
}

export default TestProviders;