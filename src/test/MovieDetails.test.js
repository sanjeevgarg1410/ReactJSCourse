import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom'; // Import necessary components and utilities
import MovieDetails from '../components/MovieDetails';
import sampleMovies from '../data/samplemovies';

describe('MovieDetails', () => {
  const sampleMovie = sampleMovies[0];

  it('should render movie details', () => {
    render(
      <MemoryRouter initialEntries={[`/movie/${sampleMovie.id}`]}>
        <Routes>
          <Route path="/movie/:id" element={<MovieDetails/>}/>
        </Routes>
      </MemoryRouter>
    );

    // Assert that specific movie details are present
    expect(screen.getByText(sampleMovie.title)).toBeInTheDocument();
    expect(screen.getByText(`Release Date: ${sampleMovie.releaseDate}`)).toBeInTheDocument();
    expect(screen.getByText(`Rating: ${sampleMovie.rating}`)).toBeInTheDocument();
    expect(screen.getByText(`Runtime: ${sampleMovie.runtime}`)).toBeInTheDocument();
  });

  it('should display "Movie not found" when movie is not found', () => {
    render(
      <MemoryRouter initialEntries={['/movie/999']}>
         <Routes>
          <Route path="/movie/:id" element={<MovieDetails/>}/>
        </Routes>
      </MemoryRouter>
    );

    // Assert that the "Movie not found" message is displayed
    expect(screen.getByText('Movie not found.')).toBeInTheDocument();
  });
});
