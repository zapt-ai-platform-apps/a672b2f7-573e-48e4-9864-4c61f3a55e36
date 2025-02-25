import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from '../../src/components/navigation/NavBar';
import { AuthContext } from '../../src/context/AuthContext';

// Mock the NavBarUserControls component
vi.mock('../../src/components/navigation/NavBarUserControls', () => ({
  default: () => <div data-testid="user-controls">User Controls</div>,
}));

// Mock the ThemeToggle component
vi.mock('../../src/components/navigation/ThemeToggle', () => ({
  default: () => <div data-testid="theme-toggle">Theme Toggle</div>,
}));

describe('NavBar Component', () => {
  it('renders the navbar with logo and controls', () => {
    render(
      <BrowserRouter>
        <AuthContext.Provider value={{ session: null, loading: false, signOut: vi.fn() }}>
          <NavBar />
        </AuthContext.Provider>
      </BrowserRouter>
    );
    
    // Check for the Football Subs logo/text
    expect(screen.getByText(/Football Subs/i)).toBeInTheDocument();
    
    // Check for the user controls
    expect(screen.getByTestId('user-controls')).toBeInTheDocument();
    
    // Check for the theme toggle
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
  });

  it('contains a link to the home page', () => {
    render(
      <BrowserRouter>
        <AuthContext.Provider value={{ session: null, loading: false, signOut: vi.fn() }}>
          <NavBar />
        </AuthContext.Provider>
      </BrowserRouter>
    );
    
    const homeLink = screen.getByText(/Football Subs/i).closest('a');
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('has the correct styling classes', () => {
    render(
      <BrowserRouter>
        <AuthContext.Provider value={{ session: null, loading: false, signOut: vi.fn() }}>
          <NavBar />
        </AuthContext.Provider>
      </BrowserRouter>
    );
    
    const navbar = screen.getByRole('navigation');
    expect(navbar).toHaveClass('bg-white');
    expect(navbar).toHaveClass('dark:bg-gray-800');
  });
});