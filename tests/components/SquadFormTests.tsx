import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SquadForm from '../../src/features/SquadManagement/components/SquadForm';
import { mockProps } from './squadFormMocks';

describe('SquadForm Component', () => {
  it('renders the squad form with correct fields', () => {
    render(<SquadForm {...mockProps} />);
    
    expect(screen.getByLabelText(/Squad Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Players/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create Squad/i })).toBeInTheDocument();
  });

  it('handles squad name input change', () => {
    render(<SquadForm {...mockProps} />);
    
    const nameInput = screen.getByLabelText(/Squad Name/i);
    fireEvent.change(nameInput, { target: { value: 'New Squad' } });
    
    expect(mockProps.setSquadName).toHaveBeenCalledWith('New Squad');
  });

  it('handles player text input change', () => {
    render(<SquadForm {...mockProps} />);
    
    const playersInput = screen.getByLabelText(/Players/i);
    fireEvent.change(playersInput, { target: { value: 'Player 1, Player 2' } });
    
    expect(mockProps.setPlayerText).toHaveBeenCalledWith('Player 1, Player 2');
  });

  it('submits the form when the button is clicked', () => {
    render(<SquadForm {...mockProps} />);
    
    const submitButton = screen.getByRole('button', { name: /Create Squad/i });
    fireEvent.click(submitButton);
    
    expect(mockProps.handleSubmit).toHaveBeenCalled();
  });

  it('disables the submit button when isSubmitting is true', () => {
    render(<SquadForm {...mockProps} isSubmitting={true} />);
    
    const submitButton = screen.getByRole('button', { name: /Create Squad/i });
    expect(submitButton).toBeDisabled();
  });

  it('displays an error message when error is provided', () => {
    render(<SquadForm {...mockProps} error="Error message" />);
    
    expect(screen.getByText(/Error message/i)).toBeInTheDocument();
  });

  it('renders a list of players when provided', () => {
    const players = [
      { id: '1', name: 'Player 1', position: 'unassigned', status: 'active', minutesPlayed: 0 },
      { id: '2', name: 'Player 2', position: 'unassigned', status: 'active', minutesPlayed: 0 }
    ];
    
    render(<SquadForm {...mockProps} players={players} />);
    
    expect(screen.getByText(/Player 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Player 2/i)).toBeInTheDocument();
  });
});