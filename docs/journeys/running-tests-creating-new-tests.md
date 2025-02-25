## Creating New Tests

To create a new test:

1. Create a new file in the `tests` directory that matches the structure of the `src` directory
2. Name the file with the `.test.ts` or `.test.tsx` extension
3. Import the component or function you want to test
4. Write your tests using Vitest and React Testing Library

Example component test:

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MyComponent from '../src/components/MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

Example utility test:

```typescript
import { describe, it, expect } from 'vitest';
import { myUtilityFunction } from '../src/utils/myUtility';

describe('myUtilityFunction', () => {
  it('returns the expected result', () => {
    const result = myUtilityFunction(5);
    expect(result).toBe(10);
  });
});
```