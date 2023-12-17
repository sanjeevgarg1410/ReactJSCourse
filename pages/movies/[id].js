import React from 'react';
import { useRouter } from 'next/router';
import { APP_URL } from '../../const';

const MovieDetails = ({ movie }) => {
  const movieDetailsStyle = {
    // Add your inline styles here
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const movieDetailsImageStyle = {
    // Add styles for the image container
    marginBottom: '20px',
  };

  const movieDetailsInfoStyle = {
    // Add styles for the information container
    textAlign: 'center',
  };

  if (!movie) {
    return (
      <div style={movieDetailsStyle}>
        Movie not found.
      </div>
    );
  }

  return (
    <div style={movieDetailsStyle}>
      <div style={movieDetailsImageStyle} >
        <img src={movie.poster_path} alt={movie.title} />
      </div>
      <div style={movieDetailsInfoStyle}>
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
  const { id } = context.params;
  console.log(id);
  const res = await fetch(`${APP_URL}/movies/${id}`);
  const movie = await res.json();

  return {
    props: { movie }, // will be passed to the page component as props
  };
}

export default MovieDetails;
