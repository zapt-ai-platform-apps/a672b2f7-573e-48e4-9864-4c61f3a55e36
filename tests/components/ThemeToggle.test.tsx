import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from '../../src/components/navigation/ThemeToggle';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => {
      store[key] = value.toString();
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock document.documentElement.classList
document.documentElement.classList = {
  add: vi.fn(),
  remove: vi.fn(),
  contains: vi.fn(),
};

describe('ThemeToggle Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
    document.documentElement.classList.contains = vi.fn().mockReturnValue(false);
  });

  it('renders the theme toggle button', () => {
    render(<ThemeToggle />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('toggles from light to dark theme when clicked', () => {
    // Mock initial state as light theme
    document.documentElement.classList.contains.mockReturnValue(false);
    
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole('button'));
    
    expect(document.documentElement.classList.add).toHaveBeenCalledWith('dark');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');
  });

  it('toggles from dark to light theme when clicked', () => {
    // Mock initial state as dark theme
    document.documentElement.classList.contains.mockReturnValue(true);
    
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole('button'));
    
    expect(document.documentElement.classList.remove).toHaveBeenCalledWith('dark');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light');
  });

  it('initializes theme from localStorage', () => {
    // Mock theme stored in localStorage
    localStorageMock.getItem.mockReturnValue('dark');
    
    render(<ThemeToggle />);
    
    expect(document.documentElement.classList.add).toHaveBeenCalledWith('dark');
  });
});