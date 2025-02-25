import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import ShareSummaryButton from '../../src/features/GameSummary/components/ShareSummaryButton';
import '../mocks/clipboardMock';

describe('ShareSummaryButton Component', () => {
  const mockSummaryText = 'This is a test summary';

  it('renders the share button', () => {
    render(<ShareSummaryButton summaryText={mockSummaryText} />);
    expect(screen.getByRole('button', { name: /Share Summary/i })).toBeInTheDocument();
  });

  it('calls navigator.clipboard.writeText when clicked', async () => {
    render(<ShareSummaryButton summaryText={mockSummaryText} />);
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Share Summary/i }));
    });
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockSummaryText);
  });

  it('shows success message after copying', async () => {
    render(<ShareSummaryButton summaryText={mockSummaryText} />);
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Share Summary/i }));
    });
    expect(screen.getByText(/Copied to clipboard!/i)).toBeInTheDocument();
  });

  it('resets to initial state after showing success message', async () => {
    vi.useFakeTimers();
    render(<ShareSummaryButton summaryText={mockSummaryText} />);
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Share Summary/i }));
    });
    expect(screen.getByText(/Copied to clipboard!/i)).toBeInTheDocument();
    await act(async () => {
      vi.advanceTimersByTime(3000);
    });
    expect(screen.getByRole('button', { name: /Share Summary/i })).toBeInTheDocument();
    expect(screen.queryByText(/Copied to clipboard!/i)).not.toBeInTheDocument();
    vi.useRealTimers();
  });

  it('handles clipboard errors correctly', async () => {
    navigator.clipboard.writeText = vi.fn().mockRejectedValue(new Error('Failed to copy'));
    render(<ShareSummaryButton summaryText={mockSummaryText} />);
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Share Summary/i }));
    });
    expect(screen.getByText(/Failed to copy/i)).toBeInTheDocument();
  });
});