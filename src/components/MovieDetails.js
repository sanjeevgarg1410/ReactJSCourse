import React, { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import MovieDialog from './MovieDialog'; // Import the MovieDialog component
import './MovieDetails.css'; // Ensure you have the corresponding CSS file
import { APP_URL } from '../const';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [editMode, setEditMode] = useState(false); // State to control the visibility of the MovieDialog
  const [movie, setMovie] = useState({});
 
  useEffect(() => {
    const url = new URL(`${APP_URL}/movies/${movieId}`)
      fetch(url).then(res => res.json()).then((res) =>{
         setMovie(res);
         console.log(res);
      })
  },[])

  const handleEditClick = () => {
    setEditMode(true); // Set the state to true to open the MovieDialog
  };


  const handleMovieUpdate = (newMovie) => {
    // Logic to handle the new movie submission
    if(typeof(newMovie.genres) === 'string')
        newMovie = {...newMovie, genres: newMovie.genres?.split(",")}
    const url = new URL(`${APP_URL}/movies`);
    fetch(url , {
      method: "PUT",
      body: JSON.stringify(newMovie),
      headers: {
        "content-type": "application/json"
      }
    }).then(res => res.json()).then((newMovie)=> {
       setMovie(newMovie);
    })
    setEditMode(false); // Close the edit dialog
  };

  const handleCloseDialog = () => {
    setEditMode(false);
  }

  if (!movie) {
    return <div>Movie not found.</div>;
  }

  return (
    <div className="movie-details">
      <div className="movie-details-image">
        <img src={movie.poster_path} alt={movie.title} />
      </div>
      <div className="movie-details-info">
        <h2>{movie.title}</h2>
        <p>Release Date: {movie.release_date}</p>
        <p>Genre: {movie.genres?.join(',')}</p>
        <p>Rating: {movie.rating}</p>
        <p>Runtime: {movie.runtime}</p>
        <p>Overview: {movie.overview}</p>
        <button onClick={handleEditClick} className="edit-movie-button">
          Edit Movie
        </button>
      </div>
      {/* Conditional rendering of the MovieDialog */}
      {editMode && (
        <MovieDialog
        initialMovieInfo={movie}
        onSubmit={handleMovieUpdate}
        onClose={handleCloseDialog}
        />
      )}
    </div>
  );
};

export default MovieDetails;
