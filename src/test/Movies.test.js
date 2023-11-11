import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Movies from '../components/Movies'; // Import your Movies component
import sampleMovies from '../data/samplemovies';

describe('Movies', () => {
  const movies = sampleMovies;

  it('should render a list of movies with links', () => {
    render(
      <MemoryRouter>
        <Movies movies={movies} />
      </MemoryRouter>
    );

    // Check if the movie tiles with links are present
    const movieTilesWithLinks = screen.getAllByRole('link');
    expect(movieTilesWithLinks).toHaveLength(movies.length);

    // You can add more specific assertions to verify the content of each tile
  });
});
