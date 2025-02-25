import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import NavBarUserControls from '../../src/components/navigation/NavBarUserControls';
import { AuthContext } from '../../src/context/AuthContext';

describe('NavBarUserControls Component', () => {
  it('renders sign in button when user is not authenticated', () => {
    const authContextValue = {
      session: null,
      loading: false,
      signOut: vi.fn()
    };

    render(
      <AuthContext.Provider value={authContextValue}>
        <NavBarUserControls />
      </AuthContext.Provider>
    );

    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
    expect(screen.queryByText(/Sign Out/i)).not.toBeInTheDocument();
  });

  it('renders sign out button when user is authenticated', () => {
    const mockSignOut = vi.fn();
    const authContextValue = {
      session: { user: { id: '123', email: 'test@example.com' } },
      loading: false,
      signOut: mockSignOut
    };

    render(
      <AuthContext.Provider value={authContextValue}>
        <NavBarUserControls />
      </AuthContext.Provider>
    );

    expect(screen.getByText(/Sign Out/i)).toBeInTheDocument();
    expect(screen.queryByText(/Sign In/i)).not.toBeInTheDocument();
  });

  it('calls signOut when sign out button is clicked', () => {
    const mockSignOut = vi.fn();
    const authContextValue = {
      session: { user: { id: '123', email: 'test@example.com' } },
      loading: false,
      signOut: mockSignOut
    };

    render(
      <AuthContext.Provider value={authContextValue}>
        <NavBarUserControls />
      </AuthContext.Provider>
    );

    fireEvent.click(screen.getByText(/Sign Out/i));
    expect(mockSignOut).toHaveBeenCalled();
  });

  it('shows loading state when auth is loading', () => {
    const authContextValue = {
      session: null,
      loading: true,
      signOut: vi.fn()
    };

    render(
      <AuthContext.Provider value={authContextValue}>
        <NavBarUserControls />
      </AuthContext.Provider>
    );

    // Should not render sign in or sign out buttons
    expect(screen.queryByText(/Sign In/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Sign Out/i)).not.toBeInTheDocument();
  });
});