import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { StateProvider } from '../../context/StateContext';

// Custom render function that includes common providers
function customRender(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & { route?: string }
) {
  const { route = '/', ...renderOptions } = options || {};
  
  return render(
    <MemoryRouter initialEntries={[route]}>
      <StateProvider>
        {ui}
      </StateProvider>
    </MemoryRouter>,
    renderOptions
  );
}

// Re-export everything from testing-library
export * from '@testing-library/react';

// Override render method
export { customRender as render };