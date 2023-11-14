import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import sampleMovies from '../data/samplemovies';
import MovieDialog from './MovieDialog'; // Import the MovieDialog component
import './MovieDetails.css'; // Ensure you have the corresponding CSS file

const MovieDetails = () => {
  const { id } = useParams();
  const [editMode, setEditMode] = useState(false); // State to control the visibility of the MovieDialog

  // Sample movie data
  const movies = sampleMovies;
  // Find the selected movie based on the ID
  const selectedMovie = movies.find((movie) => movie.id === parseInt(id));

  const handleEditClick = () => {
    setEditMode(true); // Set the state to true to open the MovieDialog
  };

  const handleMovieUpdate = (updatedMovie) => {
    // Here you would typically update the state or send a request to the server
    console.log('Updated Movie:', updatedMovie);
    setEditMode(false); // Close the edit dialog
  };

  const handleCloseDialog = () => {
    setEditMode(false);
  }

  if (!selectedMovie) {
    return <div>Movie not found.</div>;
  }

  return (
    <div className="movie-details">
      <div className="movie-details-image">
        <img src={selectedMovie.movieUrl} alt={selectedMovie.title} />
      </div>
      <div className="movie-details-info">
        <h2>{selectedMovie.title}</h2>
        <p>Release Date: {selectedMovie.releaseDate}</p>
        <p>Genre: {selectedMovie.genre.join(', ')}</p>
        <p>Rating: {selectedMovie.rating}</p>
        <p>Runtime: {selectedMovie.runtime}</p>
        <p>Overview: {selectedMovie.overview}</p>
        <button onClick={handleEditClick} className="edit-movie-button">
          Edit Movie
        </button>
      </div>
      {/* Conditional rendering of the MovieDialog */}
      {editMode && (
        <MovieDialog
        initialMovieInfo={selectedMovie}
        onSubmit={handleMovieUpdate}
        onClose={handleCloseDialog}
        />
      )}
    </div>
  );
};

export default MovieDetails;
