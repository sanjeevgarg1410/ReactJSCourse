import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for additional matchers
import MovieForm from '../components/MovieForm';

describe('MovieForm Component', () => {
  test('renders without crashing', () => {
    render(<MovieForm />);
  });

  test('form submission with valid data triggers onSubmit callback', async () => {
    const mockOnSubmit = jest.fn();
    const { getByLabelText, getByText } = render(
      <MovieForm onSubmit={mockOnSubmit} />
    );

    // Simulate user input
    fireEvent.change(getByLabelText('Title').querySelector('input'), { target: { value: 'Inception' } });
    fireEvent.change(getByLabelText('Runtime').querySelector('input'), { target: { value: '150' } });
    fireEvent.change(getByLabelText('Overview').querySelector('textarea'), { target: { value: 'A mind-bending movie' } });
    fireEvent.change(getByLabelText('Release Date').querySelector('input'), { target: { value: '2023-12-08' } });
    fireEvent.change(getByLabelText('Movie URL').querySelector('input'), { target: { value: 'http://example.com/poster.jpg' } });
    fireEvent.change(getByLabelText('Genres(comma, separated)').querySelector('input'), { target: { value: 'Action,Sci-Fi' } });

    // Submit the form
    fireEvent.click(getByText('Submit'));

    // Wait for the asynchronous validation to complete
    await waitFor(() => {
      // Expect the onSubmit callback to have been called with the correct data and method
      expect(mockOnSubmit).toHaveBeenCalledWith(
        {
          title: 'Inception',
          runtime: '150',
          overview: 'A mind-bending movie',
          release_date: '2023-12-08',
          poster_path: 'http://example.com/poster.jpg',
          genres: 'Action,Sci-Fi'
        },
        'POST'
      );
    });
  });

  // Add more test cases based on your requirements
});
