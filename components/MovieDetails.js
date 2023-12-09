import React from 'react';
import { useRouter } from 'next/router';
// import './MovieDetails.css'; // Ensure you have the corresponding CSS file
import { APP_URL } from '../const';

const MovieDetails = ({ movie }) => {
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

export async function getServerSideProps(context) {
  const { movieId } = context.params;
  const res = await fetch(`${APP_URL}/movies/${movieId}`);
  const movie = await res.json();

  return {
    props: { movie }, // will be passed to the page component as props
  };
}

export default MovieDetails;
