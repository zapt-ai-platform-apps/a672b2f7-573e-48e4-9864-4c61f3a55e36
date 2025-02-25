import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import ProtectedRoute from '../../src/components/ProtectedRoute';
import TestProviders from '../utils/TestProviders';

// Mock the Loading component
vi.mock('../../src/components/Loading', () => ({
  default: () => <div data-testid="loading-indicator">Loading...</div>
}));

// Mock the LoginPrompt component
vi.mock('../../src/components/LoginPrompt', () => ({
  default: () => <div>Please sign in to access this feature</div>
}));

describe('ProtectedRoute Component', () => {
  it('renders children when user is authenticated', async () => {
    const authContextValue = {
      session: { user: { id: '123', email: 'test@example.com' } },
      loading: false,
      signOut: vi.fn()
    };

    await act(async () => {
      render(
        <TestProviders authContextValue={authContextValue}>
          <ProtectedRoute>
            <div data-testid="protected-content">Protected Content</div>
          </ProtectedRoute>
        </TestProviders>
      );
    });

    expect(screen.getByTestId('protected-content')).toBeInTheDocument();
  });

  it('renders login prompt when user is not authenticated', async () => {
    const authContextValue = {
      session: null,
      loading: false,
      signOut: vi.fn()
    };

    await act(async () => {
      render(
        <TestProviders authContextValue={authContextValue}>
          <ProtectedRoute>
            <div data-testid="protected-content">Protected Content</div>
          </ProtectedRoute>
        </TestProviders>
      );
    });

    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
    expect(screen.getByText(/Please sign in to access this feature/i)).toBeInTheDocument();
  });

  it('renders loading component when auth is loading', async () => {
    const authContextValue = {
      session: null,
      loading: true,
      signOut: vi.fn()
    };

    await act(async () => {
      render(
        <TestProviders authContextValue={authContextValue}>
          <ProtectedRoute>
            <div data-testid="protected-content">Protected Content</div>
          </ProtectedRoute>
        </TestProviders>
      );
    });

    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
  });
});