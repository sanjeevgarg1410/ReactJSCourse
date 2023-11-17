import React, { useState, useEffect } from 'react';
import SortControl from './SortControl';
import MovieTile from './MovieTile';
import MovieDialog from './MovieDialog';
import { APP_URL } from '../const';

const MovieListPage = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [sortSelection, setSortSelection] = useState('releaseDate');

  const handleSortChange = (value) => {
    setSortSelection(value);
    // Perform sorting based on the selected sort option
    if (value === 'releaseDate') {
      // Sort by release date
      const sortedMovies = [...movies].sort((a, b) => a.release_date.localeCompare(b.release_date));
      setMovies(sortedMovies);
    } else if (value === 'title') {
      // Sort by movie title
      const sortedMovies = [...movies].sort((a, b) => a.title.localeCompare(b.title));
      setMovies(sortedMovies);
    }
  };

  useEffect(() => {
    const url = new URL(`${APP_URL}/movies`);
    fetch(url).then((res) => res.json()).then((resJson) => {
      setMovies(resJson.data);
    });
  }, [])

  const handleAddMovieClick = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleMovieSubmit = (newMovie, reqType) => {
    // Logic to handle the new movie submission
    newMovie = {...newMovie, genres: newMovie.genres?.split(",")}
    console.log(newMovie);
    const url = new URL(`${APP_URL}/movies`);
    fetch(url , {
      method: reqType,
      body: JSON.stringify(newMovie),
      headers: {
        "content-type": "application/json"
      }
    }).then(res => res.json()).then((newMovie)=> {
       const newMovies = [...movies, newMovie];
       setMovies(newMovies);
    })
    setDialogOpen(false);
  };

  const handlDelete = (id) => {
    const url = new URL(`${APP_URL}/movies/${id}`);
    fetch(url , {
      method: "DELETE"
    }).then(()=> {
      const filteredMovies = movies.filter((movie) => movie.id !== id);
      setMovies(filteredMovies);
    }); 
  }

  return (
    <div>
      <SortControl currentSelection={sortSelection} onSortChange={handleSortChange} />
      <button onClick={handleAddMovieClick} className="add-movie-button">
        Add Movie
      </button>
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieTile key={movie.id} movieInfo={movie} onDelete={handlDelete} />
        ))}
      </div>
      {isDialogOpen && <MovieDialog onClose={handleCloseDialog} onSubmit={handleMovieSubmit} />}
    </div>
  );
};

export default MovieListPage;
