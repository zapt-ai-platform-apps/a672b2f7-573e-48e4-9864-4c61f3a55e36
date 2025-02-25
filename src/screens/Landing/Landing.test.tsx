import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Landing from './index';
import { MemoryRouter } from 'react-router-dom';

// Mock the navigation hook
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe('Landing Screen', () => {
  const setup = () => {
    return render(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>
    );
  };

  it('renders the hero section with title and Get Started button', () => {
    setup();
    
    // Check for app title
    const appTitle = screen.getByRole('heading', { name: /Football Subs/i });
    expect(appTitle).toBeInTheDocument();
    
    // Check for Get Started button
    const getStartedButton = screen.getByRole('button', { name: /Get Started/i });
    expect(getStartedButton).toBeInTheDocument();
  });

  it('renders the features section with cards', () => {
    setup();
    
    // Check for features section heading
    const featuresSectionHeading = screen.getByRole('heading', { name: /Key Features/i });
    expect(featuresSectionHeading).toBeInTheDocument();
    
    // Check for feature cards
    const featureCards = screen.getAllByTestId('feature-card');
    expect(featureCards.length).toBeGreaterThan(0);
  });

  it('displays the Made on ZAPT badge', () => {
    setup();
    
    // Check for ZAPT badge
    const zaptBadge = screen.getByText(/Made on ZAPT/i);
    expect(zaptBadge).toBeInTheDocument();
    
    // Check that it links to the ZAPT website
    const zaptLink = zaptBadge.closest('a');
    expect(zaptLink).toHaveAttribute('href', 'https://www.zapt.ai');
  });
});