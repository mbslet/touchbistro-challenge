import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from './App';
import { api } from './services/api';

vi.mock('./services/api', () => ({
  api: {
    generatePoints: vi.fn(),
    checkAnswer: vi.fn(),
  }
}));

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (api.generatePoints as any).mockResolvedValue({
      points: [
        { x: 1, y: 2 },
        { x: 2, y: 4 },
        { x: 3, y: 6 },
      ],
    });
    (api.checkAnswer as any).mockResolvedValue({
      isCorrect: true,
      message: 'Correct! Well done!',
    });
  });

  it('renders the app title', async () => {
    await act(async () => {
      render(<App />);
    });
    expect(screen.getByText(/Line of Best Fit/i)).toBeInTheDocument();
  });

  it('allows entering student name and equation', async () => {
    await act(async () => {
      render(<App />);
    });

    const nameInput = screen.getByLabelText(/name/i);
    const slopeInput = screen.getByLabelText(/slope/i);
    const interceptInput = screen.getByLabelText(/intercept/i);

    await act(async () => {
      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(slopeInput, { target: { value: '2' } });
      fireEvent.change(interceptInput, { target: { value: '1' } });
    });

    expect(nameInput).toHaveValue('John Doe');
    expect(slopeInput).toHaveValue(2);
    expect(interceptInput).toHaveValue(1);
  });

  it('submits the answer and shows feedback', async () => {
    await act(async () => {
      render(<App />);
    });

    const nameInput = screen.getByLabelText(/name/i);
    const slopeInput = screen.getByLabelText(/slope/i);
    const interceptInput = screen.getByLabelText(/intercept/i);
    const submitButton = screen.getByRole('button', { name: /check answer/i });

    await act(async () => {
      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(slopeInput, { target: { value: '2' } });
      fireEvent.change(interceptInput, { target: { value: '1' } });
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(api.checkAnswer).toHaveBeenCalledWith(
        expect.any(Array),
        { slope: 2, intercept: 1 },
        'John Doe'
      );
    });
  });
}); 