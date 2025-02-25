import { vi } from 'vitest';
import React from 'react';

vi.mock('react-icons/hi', () => ({
  HiMoon: () => <div data-testid="moon-icon">Moon Icon</div>,
  HiSun: () => <div data-testid="sun-icon">Sun Icon</div>
}));

export const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    clear: vi.fn(() => {
      store = {};
    })
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

window.matchMedia = vi.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn()
}));

document.documentElement.classList = {
  add: vi.fn(),
  remove: vi.fn(),
  contains: vi.fn()
} as unknown as DOMTokenList;