import React from 'react';
import { Link } from 'react-router-dom';
const MovieTile = ({ movieInfo , onDelete: handlDelete , handleClick, handleEditClick}) => {
  const { id, title, poster_path } = movieInfo;
  const imgStyle = {
    maxWidth: '150px', // Set the maximum width
    maxHeight: '200px', // Set the maximum height
  };

  return (
    <div className="movie-tile" data-testid={`movie-tile-${id}`}>
      <div onClick={() => handleClick(movieInfo)}>
        <img src={poster_path} alt={title} style={imgStyle} />
        <h2>{title}</h2>  
      </div>  
      <button onClick={() => handlDelete(id)}>delete</button>
      <button onClick={() => handleEditClick(movieInfo)} className="edit-movie-button">
          Edit Movie
      </button>
    </div>
  );
};

export default MovieTile;
