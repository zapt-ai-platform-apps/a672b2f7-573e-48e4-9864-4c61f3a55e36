import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import BackButton from '../screens/GameManagement/BackButton';

// Mock the navigate function
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

describe('BackButton', () => {
  test('renders correctly', () => {
    render(
      <BrowserRouter>
        <BackButton />
      </BrowserRouter>
    );
    
    const button = screen.getByText('Back');
    expect(button).toBeInTheDocument();
  });
  
  test('navigates back when clicked', () => {
    render(
      <BrowserRouter>
        <BackButton />
      </BrowserRouter>
    );
    
    const button = screen.getByText('Back');
    fireEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});