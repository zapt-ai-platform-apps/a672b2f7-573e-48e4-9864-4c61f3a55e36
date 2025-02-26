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

// Create a mock PointerEvent for drag and drop tests
global.PointerEvent = class PointerEvent extends Event {
  button: number;
  clientX: number;
  clientY: number;
  pointerId: number;
  pointerType: string;
  isPrimary: boolean;
  screenX: number;
  screenY: number;
  pageX: number;
  pageY: number;
  offsetX: number;
  offsetY: number;
  movementX: number;
  movementY: number;
  width: number;
  height: number;
  pressure: number;
  tiltX: number;
  tiltY: number;
  twist: number;
  tangentialPressure: number;
  
  constructor(type: string, params: any = {}) {
    super(type, { bubbles: true, cancelable: true, ...params });
    this.button = params.button || 0;
    this.clientX = params.clientX || 0;
    this.clientY = params.clientY || 0;
    this.pointerId = params.pointerId || 1;
    this.pointerType = params.pointerType || 'mouse';
    this.isPrimary = params.isPrimary !== undefined ? params.isPrimary : true;
    this.screenX = params.screenX || 0;
    this.screenY = params.screenY || 0;
    this.pageX = params.pageX || 0;
    this.pageY = params.pageY || 0;
    this.offsetX = params.offsetX || 0;
    this.offsetY = params.offsetY || 0;
    this.movementX = params.movementX || 0;
    this.movementY = params.movementY || 0;
    this.width = params.width || 0;
    this.height = params.height || 0;
    this.pressure = params.pressure || 0;
    this.tiltX = params.tiltX || 0;
    this.tiltY = params.tiltY || 0;
    this.twist = params.twist || 0;
    this.tangentialPressure = params.tangentialPressure || 0;
  }
};

// Mock Element.prototype.setPointerCapture
Element.prototype.setPointerCapture = Element.prototype.setPointerCapture || vi.fn();
Element.prototype.releasePointerCapture = Element.prototype.releasePointerCapture || vi.fn();

// Global mocks
global.fetch = vi.fn();