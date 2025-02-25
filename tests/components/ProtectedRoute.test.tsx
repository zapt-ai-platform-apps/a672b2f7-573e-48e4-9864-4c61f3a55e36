import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../../src/components/ProtectedRoute';
import { AuthContext } from '../../src/context/AuthContext';

describe('ProtectedRoute Component', () => {
  it('renders children when user is authenticated', () => {
    const authContextValue = {
      session: { user: { id: '123', email: 'test@example.com' } },
      loading: false,
      signOut: vi.fn()
    };

    render(
      <AuthContext.Provider value={authContextValue}>
        <MemoryRouter initialEntries={['/protected']}>
          <Routes>
            <Route path="/protected" element={
              <ProtectedRoute>
                <div data-testid="protected-content">Protected Content</div>
              </ProtectedRoute>
            } />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByTestId('protected-content')).toBeInTheDocument();
  });

  it('renders login prompt when user is not authenticated', () => {
    const authContextValue = {
      session: null,
      loading: false,
      signOut: vi.fn()
    };

    render(
      <AuthContext.Provider value={authContextValue}>
        <MemoryRouter initialEntries={['/protected']}>
          <Routes>
            <Route path="/protected" element={
              <ProtectedRoute>
                <div data-testid="protected-content">Protected Content</div>
              </ProtectedRoute>
            } />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    // Should not render the protected content
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
    
    // Should render the login prompt
    expect(screen.getByText(/Please sign in to access this feature/i)).toBeInTheDocument();
  });

  it('renders loading component when auth is loading', () => {
    const authContextValue = {
      session: null,
      loading: true,
      signOut: vi.fn()
    };

    render(
      <AuthContext.Provider value={authContextValue}>
        <MemoryRouter initialEntries={['/protected']}>
          <Routes>
            <Route path="/protected" element={
              <ProtectedRoute>
                <div data-testid="protected-content">Protected Content</div>
              </ProtectedRoute>
            } />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    // Should not render the protected content
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
    
    // Should render loading indicator
    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
  });
});