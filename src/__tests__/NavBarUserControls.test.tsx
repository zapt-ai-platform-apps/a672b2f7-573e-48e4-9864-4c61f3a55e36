import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import NavBarUserControls from '../components/navigation/NavBarUserControls';

// Mock auth session and navigate
const mockSignOut = vi.fn();
const mockNavigate = vi.fn();

vi.mock('../hooks/useAuthSession', () => ({
  useAuthSession: () => ({
    session: { user: { email: 'test@example.com' } },
    signOut: mockSignOut
  })
}));

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

describe('NavBarUserControls', () => {
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

// Test for when user is signed out
vi.mock('../hooks/useAuthSession', () => ({
  useAuthSession: () => ({
    session: null,
    signOut: mockSignOut
  })
}), { virtual: true });

describe('NavBarUserControls when signed out', () => {
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