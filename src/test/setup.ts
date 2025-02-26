import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock window.matchMedia which is not implemented in JSDOM
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Set up common mocks that multiple tests might need
export const mockNavigate = vi.fn();

// Mock helper to create router mocks
export function setupRouterMocks() {
  vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
      ...(actual as any),
      useNavigate: () => mockNavigate,
    };
  });

  return { mockNavigate };
}

// Mock ResizeObserver which is not implemented in JSDOM
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock createPointerEvent for drag and drop tests
global.PointerEvent = class PointerEvent extends Event {
  button: number;
  clientX: number;
  clientY: number;
  pointerId: number;
  pointerType: string;
  
  constructor(type: string, params: any = {}) {
    super(type, params);
    this.button = params.button || 0;
    this.clientX = params.clientX || 0;
    this.clientY = params.clientY || 0;
    this.pointerId = params.pointerId || 1;
    this.pointerType = params.pointerType || 'mouse';
  }
};

// Mock Element.prototype.setPointerCapture
Element.prototype.setPointerCapture = Element.prototype.setPointerCapture || vi.fn();
Element.prototype.releasePointerCapture = Element.prototype.releasePointerCapture || vi.fn();

// Global mocks
global.fetch = vi.fn();