## Mocking Dependencies

When testing components that rely on external dependencies (like API calls), you can use Vitest's mocking capabilities to mock these dependencies:

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import MyComponent from '../src/components/MyComponent';

// Mock external dependency
vi.mock('../src/api/myApi', () => ({
  fetchData: vi.fn().mockResolvedValue({ data: 'test data' })
}));

describe('MyComponent', () => {
  it('renders data from API', async () => {
    render(<MyComponent />);
    expect(await screen.findByText('test data')).toBeInTheDocument();
  });
});
```