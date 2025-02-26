import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi, beforeEach, describe, test, expect } from 'vitest';
import NavBarUserControls from '../components/navigation/NavBarUserControls';
import { act } from '@testing-library/react';

// Mock navigate
const mockNavigate = vi.fn();
const mockSignOut = vi.fn();

// Correctly mock the default export from useAuthSession
vi.mock('../hooks/useAuthSession', () => ({
  __esModule: true,
  default: () => ({
    session: null,
    signOut: mockSignOut
  })
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
    require('../hooks/useAuthSession').default.mockReturnValue({
      session: { user: { email: 'test@example.com' } },
      signOut: mockSignOut
    });
  });

  test('renders sign out button when user is signed in', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <NavBarUserControls />
        </BrowserRouter>
      );
    });
    
    const signOutButton = screen.getByText('Sign Out');
    expect(signOutButton).toBeInTheDocument();
  });
  
  test('calls signOut when sign out button is clicked', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <NavBarUserControls />
        </BrowserRouter>
      );
    });
    
    const signOutButton = screen.getByText('Sign Out');
    await act(async () => {
      fireEvent.click(signOutButton);
    });
    expect(mockSignOut).toHaveBeenCalled();
  });
});

// Separate describe block for signed-out user tests
describe('NavBarUserControls - Signed Out', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockNavigate.mockClear();
    
    // Configure mock for signed-out user
    require('../hooks/useAuthSession').default.mockReturnValue({
      session: null,
      signOut: mockSignOut
    });
  });

  test('renders sign in button when user is not signed in', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <NavBarUserControls />
        </BrowserRouter>
      );
    });
    
    const signInButton = screen.getByText('Sign In');
    expect(signInButton).toBeInTheDocument();
  });
  
  test('navigates to sign-in when button is clicked', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <NavBarUserControls />
        </BrowserRouter>
      );
    });
    
    const signInButton = screen.getByText('Sign In');
    await act(async () => {
      fireEvent.click(signInButton);
    });
    expect(mockNavigate).toHaveBeenCalledWith('/sign-in');
  });
});