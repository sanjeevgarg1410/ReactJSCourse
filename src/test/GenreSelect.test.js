import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import GenreSelect from '../components/GenreSelect'; // Import the GenreSelect component


describe('GenreSelect Component Tests', () => {
  it('renders all genres passed in props', () => {
    const genres = ['Action', 'Adventure', 'Comedy'];
    const { getByText } = render(<GenreSelect genres={genres} selectedGenre="" />);

    genres.forEach((genre) => {
      const genreButton = getByText(genre);
      expect(genreButton).toBeInTheDocument();
    });
  });

  it('highlights the selected genre passed in props', () => {
    const genres = ['Action', 'Adventure', 'Comedy'];
    const selectedGenre = 'Adventure';
    const { getByText } = render(<GenreSelect genres={genres} selectedGenre={selectedGenre} />);

    const selectedGenreButton = getByText(selectedGenre);
    expect(selectedGenreButton).toHaveClass('selected');
  });

  it('calls the onChange callback with the correct genre after a click event', () => {
    const genres = ['Action', 'Adventure', 'Comedy'];
    const selectedGenre = 'Adventure';
    const mockOnChange = jest.fn();
    const { getByText } = render(<GenreSelect genres={genres} selectedGenre={selectedGenre} onSelect={mockOnChange} />);

    const genreToSelect = 'Comedy';
    const genreButton = getByText(genreToSelect);
    
    fireEvent.click(genreButton);
    
    expect(mockOnChange).toHaveBeenCalledWith(genreToSelect);
  });
});
