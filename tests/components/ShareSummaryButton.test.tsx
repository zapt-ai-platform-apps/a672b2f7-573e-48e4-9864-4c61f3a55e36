import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ShareSummaryButton from '../../src/features/GameSummary/components/ShareSummaryButton';

// Mock the clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn().mockImplementation(() => Promise.resolve())
  }
});

describe('ShareSummaryButton Component', () => {
  const mockSummaryText = 'This is a test summary';

  it('renders the share button', () => {
    render(<ShareSummaryButton summaryText={mockSummaryText} />);
    
    expect(screen.getByRole('button', { name: /Share Summary/i })).toBeInTheDocument();
  });

  it('calls navigator.clipboard.writeText when clicked', async () => {
    render(<ShareSummaryButton summaryText={mockSummaryText} />);
    
    fireEvent.click(screen.getByRole('button', { name: /Share Summary/i }));
    
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockSummaryText);
  });

  it('shows success message after copying', async () => {
    render(<ShareSummaryButton summaryText={mockSummaryText} />);
    
    fireEvent.click(screen.getByRole('button', { name: /Share Summary/i }));
    
    // Should show success message
    expect(await screen.findByText(/Copied to clipboard!/i)).toBeInTheDocument();
  });

  it('resets to initial state after showing success message', async () => {
    vi.useFakeTimers();
    
    render(<ShareSummaryButton summaryText={mockSummaryText} />);
    
    fireEvent.click(screen.getByRole('button', { name: /Share Summary/i }));
    
    // Should initially show success message
    expect(screen.getByText(/Copied to clipboard!/i)).toBeInTheDocument();
    
    // Advance timers
    vi.advanceTimersByTime(3000);
    
    // Should reset to "Share Summary"
    expect(screen.getByRole('button', { name: /Share Summary/i })).toBeInTheDocument();
    expect(screen.queryByText(/Copied to clipboard!/i)).not.toBeInTheDocument();
    
    vi.useRealTimers();
  });

  it('handles clipboard errors correctly', async () => {
    // Mock clipboard failure
    navigator.clipboard.writeText = vi.fn().mockRejectedValue(new Error('Failed to copy'));
    
    render(<ShareSummaryButton summaryText={mockSummaryText} />);
    
    fireEvent.click(screen.getByRole('button', { name: /Share Summary/i }));
    
    // Should show error message
    expect(await screen.findByText(/Failed to copy/i)).toBeInTheDocument();
  });
});