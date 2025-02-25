import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import SignIn from '../../src/components/SignIn';

// Mock the Auth UI component from Supabase
vi.mock('@supabase/auth-ui-react', () => ({
  Auth: () => <div data-testid="auth-ui">Auth UI Component</div>
}));

// Mock the appearance import
vi.mock('../../src/config/authAppearance', () => ({
  default: { theme: 'test-theme' }
}));

// Mock the supabaseClient
vi.mock('../../src/supabaseClient', () => ({
  supabase: {}
}));

describe('SignIn Component', () => {
  it('renders the sign in component with ZAPT text', () => {
    render(<SignIn />);
    
    // Check for the "Sign in with ZAPT" text
    expect(screen.getByText(/Sign in with ZAPT/i)).toBeInTheDocument();
    
    // Check that the Auth UI component is rendered
    expect(screen.getByTestId('auth-ui')).toBeInTheDocument();
    
    // Check for the ZAPT link
    const zaptLink = screen.getByText(/ZAPT/i).closest('a');
    expect(zaptLink).toHaveAttribute('href', 'https://www.zapt.ai');
    expect(zaptLink).toHaveAttribute('target', '_blank');
  });
});