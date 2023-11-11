import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import MovieDialog from '../components/MovieDialog';

// Mock focus-trap-react for testing purposes
jest.mock('focus-trap-react', () => ({ children }) => <div>{children}</div>);

describe('MovieDialog', () => {
  // Test if the MovieDialog renders correctly when opened
  it('renders correctly', async () => {
    const { findByText } = render(
      <MovieDialog isOpen={true} onClose={() => {}} onSubmit={() => {}} />
    );
    // Use findByText which returns a promise to wait for the element to appear
    const dialogTitle = await findByText(/add movie/i);
    expect(dialogTitle).toBeInTheDocument();
  });

  // Test if the MovieDialog calls the onClose prop when the close button is clicked
  it('calls onClose when the close button is clicked', async () => {
    const mockOnClose = jest.fn();
    const { findByText } = render(
      <MovieDialog isOpen={true} onClose={mockOnClose} onSubmit={() => {}} />
    );

    fireEvent.click(await findByText('×')); // Assuming '×' is the text of the close button
    expect(mockOnClose).toHaveBeenCalled();
  });

  // Test if the MovieDialog calls the onSubmit prop when the form is submitted with the correct data
  it('calls onSubmit with the movie data when the form is submitted', async () => {
    const mockOnSubmit = jest.fn();
    const { getByLabelText, getByText } = render(
      <MovieDialog isOpen={true} onClose={() => {}} onSubmit={mockOnSubmit}/>
    );

    fireEvent.change(getByLabelText(/Title/i), { target: { value: 'New Movie' } });
    fireEvent.change(getByLabelText(/overview/i), { target: { value: 'A great movie' } });
    fireEvent.change(getByLabelText(/rating/i), { target: { value: '5' } });

    fireEvent.click(getByText(/submit/i)); // Assuming 'Submit' is the text of the submit button

    // The mock function should be called with the expected movie object
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(expect.objectContaining({
        title: 'New Movie',
        overview: 'A great movie',
        rating: '5'
      }));
    });
  });
});
