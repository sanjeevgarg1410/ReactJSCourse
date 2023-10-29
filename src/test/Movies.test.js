import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Movies from '../components/Movies'; // Import your Movies component

describe('Movies', () => {
  const movies = [
    {
      id: 1,
      movieName: 'Movie 1',
      imageUrl: 'https://example.com/movie1.jpg',
      // Add other movie data
    },
    {
      id: 2,
      movieName: 'Movie 2',
      imageUrl: 'https://example.com/movie2.jpg',
      // Add other movie data
    },
    // Add more movie objects
  ];

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
