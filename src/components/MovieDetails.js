import React from 'react';
import { useParams } from 'react-router-dom';
import sampleMovies from '../data/samplemovies';
import './MovieDetails.css'; // Import your CSS file for MovieDetails

const MovieDetails = () => {
  const { id } = useParams();

  // Sample movie data
  const movies = sampleMovies;
  // Find the selected movie based on the ID
  const selectedMovie = movies.find((movie) => movie.id === parseInt(id));

  if (!selectedMovie) {
    return <div>Movie not found.</div>;
  }

  return (
    <div className="movie-details">
      <div className="movie-details-image">
        <img src={selectedMovie.imageUrl} alt={selectedMovie.movieName} />
      </div>
      <div className="movie-details-info">
        <h2>{selectedMovie.movieName}</h2>
        <p>Release Year: {selectedMovie.releaseYear}</p>
        <p>Rating: {selectedMovie.rating}</p>
        <p>Duration: {selectedMovie.duration} minutes</p>
        <p>{selectedMovie.description}</p>
      </div>
    </div>
  );
};

export default MovieDetails;
