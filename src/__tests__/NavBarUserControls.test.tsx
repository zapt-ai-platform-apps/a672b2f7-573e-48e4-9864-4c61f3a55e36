import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi, beforeEach, describe, test, expect } from 'vitest';
import NavBarUserControls from '../components/navigation/NavBarUserControls';

// Mock navigate
const mockNavigate = vi.fn();
const mockSignOut = vi.fn();

// Improved mock for useAuthSession with explicit path
vi.mock('../hooks/useAuthSession', () => ({
  useAuthSession: vi.fn(() => ({
    session: null,
    signOut: mockSignOut
  }))
}));

// Mock router with correct import
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...(actual as any),
    useNavigate: () => mockNavigate
  };
});

describe('NavBarUserControls - Signed In', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockNavigate.mockClear();
    
    // Configure mock for signed-in user
    require('../hooks/useAuthSession').useAuthSession.mockReturnValue({
      session: { user: { email: 'test@example.com' } },
      signOut: mockSignOut
    });
  });

  test('renders sign out button when user is signed in', () => {
    render(
      <BrowserRouter>
        <NavBarUserControls />
      </BrowserRouter>
    );
    
    const signOutButton = screen.getByText('Sign Out');
    expect(signOutButton).toBeInTheDocument();
  });
  
  test('calls signOut when sign out button is clicked', () => {
    render(
      <BrowserRouter>
        <NavBarUserControls />
      </BrowserRouter>
    );
    
    const signOutButton = screen.getByText('Sign Out');
    fireEvent.click(signOutButton);
    expect(mockSignOut).toHaveBeenCalled();
  });
});

// Separate describe block for signed-out user tests
describe('NavBarUserControls - Signed Out', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockNavigate.mockClear();
    
    // Configure mock for signed-out user
    require('../hooks/useAuthSession').useAuthSession.mockReturnValue({
      session: null,
      signOut: mockSignOut
    });
  });

  test('renders sign in button when user is not signed in', () => {
    render(
      <BrowserRouter>
        <NavBarUserControls />
      </BrowserRouter>
    );
    
    const signInButton = screen.getByText('Sign In');
    expect(signInButton).toBeInTheDocument();
  });
  
  test('navigates to sign-in when button is clicked', () => {
    render(
      <BrowserRouter>
        <NavBarUserControls />
      </BrowserRouter>
    );
    
    const signInButton = screen.getByText('Sign In');
    fireEvent.click(signInButton);
    expect(mockNavigate).toHaveBeenCalledWith('/sign-in');
  });
});