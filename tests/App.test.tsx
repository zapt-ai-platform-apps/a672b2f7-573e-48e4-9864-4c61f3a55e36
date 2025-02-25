import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import App from '../src/App';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../src/context/AuthContext';
import { StateContext } from '../src/context/StateContext';

// Mock the supabaseClient
vi.mock('../src/supabaseClient', () => ({
  supabase: {
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
      onAuthStateChange: vi.fn().mockReturnValue({ 
        data: { subscription: { unsubscribe: vi.fn() } } 
      })
    }
  },
  recordLogin: vi.fn(),
  createEvent: vi.fn()
}));

// Mock StateProvider to avoid complex state setup
vi.mock('../src/components/StateProvider', () => ({
  default: ({ children }) => <div>{children}</div>
}));

// Mock ErrorBoundary for simplicity
vi.mock('../src/components/ErrorBoundary', () => ({
  default: ({ children }) => <div>{children}</div>
}));

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the landing page when not authenticated', async () => {
    const authContextValue = {
      session: null,
      loading: false,
      signOut: vi.fn()
    };

    const stateContextValue = {
      state: {},
      dispatch: vi.fn()
    };

    await act(async () => {
      render(
        <BrowserRouter>
          <AuthContext.Provider value={authContextValue}>
            <StateContext.Provider value={stateContextValue}>
              <App />
            </StateContext.Provider>
          </AuthContext.Provider>
        </BrowserRouter>
      );
    });
    
    // Check for elements that should be on the landing page
    expect(screen.getByText(/Football Subs/i)).toBeInTheDocument();
    
    // Check for the "Made on ZAPT" badge
    const zaptLink = screen.getByText(/Made on ZAPT/i);
    expect(zaptLink).toBeInTheDocument();
    expect(zaptLink.closest('a')).toHaveAttribute('href', 'https://www.zapt.ai');
  });
});