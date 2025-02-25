import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SquadForm from './SquadForm';

describe('SquadForm component', () => {
  const mockOnSubmit = vi.fn();
  const mockOnCancel = vi.fn();
  
  const defaultProps = {
    onSubmit: mockOnSubmit,
    onCancel: mockOnCancel,
    isSubmitting: false,
    squadName: '',
    setSquadName: vi.fn(),
    playersInput: '',
    setPlayersInput: vi.fn(),
    error: '',
    action: 'create' as const
  };
  
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  it('renders the form with appropriate title for create mode', () => {
    render(<SquadForm {...defaultProps} />);
    
    expect(screen.getByText('Create Squad')).toBeInTheDocument();
    expect(screen.getByLabelText('Squad Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Players')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Create' })).toBeInTheDocument();
  });
  
  it('renders the form with appropriate title for edit mode', () => {
    render(<SquadForm {...defaultProps} action="edit" />);
    
    expect(screen.getByText('Edit Squad')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Update' })).toBeInTheDocument();
  });
  
  it('shows loading state when submitting', () => {
    render(<SquadForm {...defaultProps} isSubmitting={true} />);
    
    const submitButton = screen.getByRole('button', { name: 'Create' });
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent('Creating...');
  });
  
  it('shows error message when provided', () => {
    render(<SquadForm {...defaultProps} error="Error message" />);
    
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });
  
  it('calls onSubmit when form is submitted', () => {
    render(<SquadForm {...defaultProps} />);
    
    fireEvent.submit(screen.getByTestId('squad-form'));
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });
  
  it('calls onCancel when cancel button is clicked', () => {
    render(<SquadForm {...defaultProps} />);
    
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });
});