import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BackButton from '@/screens/GameManagement/BackButton';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...(actual as any),
    useNavigate: () => mockNavigate
  };
});

describe('BackButton Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders the button correctly', () => {
    render(
      <BrowserRouter>
        <BackButton />
      </BrowserRouter>
    );
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button.textContent).toContain('Back');
  });

  it('navigates back when clicked', () => {
    render(
      <BrowserRouter>
        <BackButton />
      </BrowserRouter>
    );
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it('supports custom onClick handler', () => {
    const customOnClick = vi.fn();
    
    render(
      <BrowserRouter>
        <BackButton onClick={customOnClick} />
      </BrowserRouter>
    );
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(customOnClick).toHaveBeenCalled();
    // Should not call navigate when custom handler is provided
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});