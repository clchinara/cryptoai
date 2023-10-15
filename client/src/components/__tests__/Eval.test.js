import { render, screen } from '@testing-library/react';
import Eval from '../Eval';

test('should render Eval page', () => {
    render(<Eval />);
    const header = screen.getByText('Eval');
    const invSelect = screen.getByTestId('inv');
    const submitEvalButton = screen.getByTestId('submitEval');
    expect(header).toBeInTheDocument();
    expect(invSelect).toBeInTheDocument();
    expect(submitEvalButton).toBeInTheDocument();
})