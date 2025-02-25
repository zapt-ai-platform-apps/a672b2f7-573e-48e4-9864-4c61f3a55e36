import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { AuthProvider } from '../../src/components/AuthProvider';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../../src/context/AuthContext';

// Mock the supabaseClient
vi.mock('../../src/supabaseClient', () => ({
  supabase: {
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
      onAuthStateChange: vi.fn().mockReturnValue({ 
        data: { subscription: { unsubscribe: vi.fn() } } 
      }),
      signOut: vi.fn().mockResolvedValue({})
    }
  },
  recordLogin: vi.fn().mockResolvedValue({})
}));

// Mock Sentry
vi.mock('@sentry/browser', () => ({
  captureException: vi.fn()
}));

// Mock navigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});

describe('AuthProvider Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders children and provides auth context', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <AuthProvider>
            <div data-testid="child-component">Test Child</div>
          </AuthProvider>
        </BrowserRouter>
      );
    });
    
    expect(screen.getByTestId('child-component')).toBeInTheDocument();
  });

  it('provides the expected context values', async () => {
    // Create a test component that consumes the auth context
    const TestConsumer = () => {
      const context = React.useContext(AuthContext);
      return (
        <div>
          <div data-testid="session">{context.session ? 'logged-in' : 'logged-out'}</div>
          <div data-testid="loading">{context.loading ? 'loading' : 'not-loading'}</div>
          <button data-testid="signout" onClick={context.signOut}>Sign Out</button>
        </div>
      );
    };

    await act(async () => {
      render(
        <BrowserRouter>
          <AuthProvider>
            <TestConsumer />
          </AuthProvider>
        </BrowserRouter>
      );
    });

    // Initially user is not logged in
    expect(screen.getByTestId('session')).toHaveTextContent('logged-out');
    
    // Check that sign out function is provided
    expect(screen.getByTestId('signout')).toBeInTheDocument();
  });
});