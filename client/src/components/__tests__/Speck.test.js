import { render, screen } from '@testing-library/react';
import Speck from '../Speck';

test('should render Speck page', () => {
    render(<Speck />);
    const defaultNumPlaintexts = 4
    const header = screen.getByText('Speck 32/64');
    const numPlaintextsSelect = screen.getByTestId('numPlaintexts');
    const numRoundsSelect = screen.getByTestId('numRounds');
    const submitSpeckButton = screen.getByTestId('submitSpeck');
    expect(header).toBeInTheDocument();
    expect(numPlaintextsSelect).toBeInTheDocument();
    expect(numRoundsSelect).toBeInTheDocument();
    expect(submitSpeckButton).toBeInTheDocument();
    for (let i = 1; i <= defaultNumPlaintexts; i++) {
        const inputField = screen.getByTestId(`input-${i}`);
        expect(inputField).toBeInTheDocument();
    }
})