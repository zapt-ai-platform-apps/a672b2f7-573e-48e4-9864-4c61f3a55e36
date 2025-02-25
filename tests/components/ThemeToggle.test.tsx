import '../setup/mocks';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from '../../src/components/navigation/ThemeToggle';
import React from 'react';
import { localStorageMock } from '../setup/mocks';

describe('ThemeToggle Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
    (document.documentElement.classList.contains as any).mockReturnValue(false);
  });

  it('renders the theme toggle button', () => {
    render(<ThemeToggle />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('toggles from light to dark theme when clicked', () => {
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole('button'));
    
    expect(document.documentElement.classList.add).toHaveBeenCalledWith('dark');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');
  });

  it('toggles from dark to light theme when clicked', () => {
    localStorageMock.getItem.mockReturnValue('dark');
    
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole('button'));
    
    expect(document.documentElement.classList.remove).toHaveBeenCalledWith('dark');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light');
  });

  it('initializes theme from localStorage', () => {
    localStorageMock.getItem.mockReturnValue('dark');
    
    render(<ThemeToggle />);
    
    expect(document.documentElement.classList.add).toHaveBeenCalledWith('dark');
  });
});