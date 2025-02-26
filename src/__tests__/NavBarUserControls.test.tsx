import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import NavBarUserControls from '../components/navigation/NavBarUserControls';

// Create separate mock setups for the two different test scenarios
const setupSignedInUser = () => {
  // Mock auth session with a signed-in user
  const mockSignOut = vi.fn();
  
  vi.mock('../hooks/useAuthSession', () => ({
    useAuthSession: () => ({
      session: { user: { email: 'test@example.com' } },
      signOut: mockSignOut
    })
  }), { virtual: true });

  return { mockSignOut };
};

const setupSignedOutUser = () => {
  // Mock auth session with no user
  const mockSignOut = vi.fn();
  
  vi.mock('../hooks/useAuthSession', () => ({
    useAuthSession: () => ({
      session: null,
      signOut: mockSignOut
    })
  }), { virtual: true });

  return { mockSignOut };
};

// Mock navigate function
const mockNavigate = vi.fn();

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

describe('NavBarUserControls', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Setup for signed-in user tests
  const { mockSignOut } = setupSignedInUser();

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
describe('NavBarUserControls when signed out', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Setup for signed-out user tests
  setupSignedOutUser();

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