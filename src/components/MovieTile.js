import React from 'react';
import { Link } from 'react-router-dom';

const MovieTile = ({ movieInfo }) => {
  const { id, movieName, imageUrl } = movieInfo;
  const imgStyle = {
    maxWidth: '150px', // Set the maximum width
    maxHeight: '200px', // Set the maximum height
  };

  return (
    <div className="movie-tile" data-testid={`movie-tile-${id}`}>
      <Link to={`/movie/${id}`}>
        <img src={imageUrl} alt={movieName} style={imgStyle} />
        <h2>{movieName}</h2>
      </Link>
    </div>
  );
};

export default MovieTile;
