import React, { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import MovieDialog from './MovieDialog'; // Import the MovieDialog component
import './MovieDetails.css'; // Ensure you have the corresponding CSS file
import { APP_URL } from '../const';

const MovieDetails = () => {
 const [movie, setMovie] = useState({});
 const { movieId } = useParams();
  useEffect(() => {
    const url = new URL(`${APP_URL}/movies/${movieId}`)
      fetch(url).then(res => res.json()).then((res) =>{
         setMovie(res);
      })
  },[])

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
      </div>    
    </div>
  );
};

export default MovieDetails;
