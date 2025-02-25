import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../src/App';
import { BrowserRouter } from 'react-router-dom';

// Mock the supabaseClient
vi.mock('../src/supabaseClient', () => ({
  supabase: {
    auth: {
      getSession: () => ({ data: { session: null } }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: vi.fn() } } })
    }
  },
  recordLogin: vi.fn(),
  createEvent: vi.fn()
}));

// Mock StateProvider to avoid complex state setup
vi.mock('../src/components/StateProvider', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

// Mock ErrorBoundary for simplicity
vi.mock('../src/components/ErrorBoundary', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

describe('App Component', () => {
  it('renders the landing page when not authenticated', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    // Check for elements that should be on the landing page
    expect(await screen.findByText(/Football Subs/i)).toBeInTheDocument();
    
    // Check for the "Made on ZAPT" badge
    const zaptLink = await screen.findByText(/Made on ZAPT/i);
    expect(zaptLink).toBeInTheDocument();
    expect(zaptLink.closest('a')).toHaveAttribute('href', 'https://www.zapt.ai');
  });
});