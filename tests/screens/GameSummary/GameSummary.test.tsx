import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import GameSummary, { renderWithProviders } from './GameSummaryTestUtils';

// Mock the navigator.clipboard
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn().mockImplementation(() => Promise.resolve())
  }
});

describe('GameSummary Component', () => {
  it('renders game summary with correct match information', () => {
    renderWithProviders(<GameSummary />);
    expect(screen.getByText(/My Team/i)).toBeInTheDocument();
    expect(screen.getByText(/Opponents/i)).toBeInTheDocument();
    expect(screen.getByText(/3 - 1/i)).toBeInTheDocument();
  });

  it('displays goals list correctly', () => {
    renderWithProviders(<GameSummary />);
    expect(screen.getByText(/Goals/i)).toBeInTheDocument();
    expect(screen.getByText(/Scorer 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Scorer 2/i)).toBeInTheDocument();
  });

  it('displays player play times correctly', () => {
    renderWithProviders(<GameSummary />);
    expect(screen.getByText(/Player Play Times/i)).toBeInTheDocument();
    expect(screen.getByText(/Player 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Player 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Player 3/i)).toBeInTheDocument();
  });

  it('has a share button', () => {
    renderWithProviders(<GameSummary />);
    expect(screen.getByRole('button', { name: /Share Summary/i })).toBeInTheDocument();
  });
});