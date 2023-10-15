import { render, screen } from '@testing-library/react';
import Demo from '../Demo';

test('should render Demo page', () => {
    render(<Demo />);
    const defaultNumCiphertexts = 4
    const header = screen.getByText('Demo');
    const numCiphertextsSelect = screen.getByTestId('numCiphertexts');
    const numRoundsSelect = screen.getByTestId('numRounds');
    const submitDemoButton = screen.getByTestId('submitDemo');
    expect(header).toBeInTheDocument();
    expect(numCiphertextsSelect).toBeInTheDocument();
    expect(numRoundsSelect).toBeInTheDocument();
    expect(submitDemoButton).toBeInTheDocument();
    for (let i = 1; i <= defaultNumCiphertexts; i++) {
        const inputField = screen.getByTestId(`input-${i}`);
        expect(inputField).toBeInTheDocument();
    }
})