import React from 'react';
import SortControl from './SortControl';
import MovieTile from './MovieTile';

const Movies = ({ movies, handleSortChange, sortSelection }) => {
  return (
    <div>
     <SortControl currentSelection={sortSelection} onSortChange={handleSortChange} />
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieTile key={movie.id} movieInfo={movie} />
        ))}
      </div>
    </div>
  );
};

export default Movies;
