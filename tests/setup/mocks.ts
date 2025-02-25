import { vi } from 'vitest';

// Mock the supabaseClient
vi.mock('../../src/supabaseClient', () => ({
  supabase: {
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
      onAuthStateChange: vi.fn().mockReturnValue({ 
        data: { subscription: { unsubscribe: vi.fn() } } 
      }),
      signOut: vi.fn().mockResolvedValue({})
    }
  },
  recordLogin: vi.fn().mockResolvedValue({}),
  createEvent: vi.fn().mockResolvedValue({})
}));

// Mock Sentry
vi.mock('@sentry/browser', () => ({
  captureException: vi.fn(),
  init: vi.fn()
}));

// Mock React Router's useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn()
  };
});

// Reset all mocks between tests
afterEach(() => {
  vi.resetAllMocks();
});