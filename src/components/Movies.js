import React, { useState, useEffect } from 'react';
import SortControl from './SortControl';
import MovieTile from './MovieTile';
import MovieDialog from './MovieDialog';
import sampleMovies from '../data/samplemovies';
import { useNavigate } from 'react-router';

const Movies = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [moviesData, setMoviesData] = useState([]);
  const [sortSelection, setSortSelection] = useState('releaseDate');
  const navigate = useNavigate()

  const handleSortChange = (value) => {
    setSortSelection(value);

    // Perform sorting based on the selected sort option
    if (value === 'releaseDate') {
      // Sort by release date
      const sortedMovies = [...moviesData].sort((a, b) => a.releaseYear - b.releaseYear);
      setMoviesData(sortedMovies);
    } else if (value === 'title') {
      // Sort by movie title
      const sortedMovies = [...moviesData].sort((a, b) => a.movieName.localeCompare(b.movieName));
      setMoviesData(sortedMovies);
    }
  };

  useEffect(() => {
    const storedMovies = JSON.parse(localStorage.getItem('movies')) || sampleMovies;
    localStorage.setItem('movies', JSON.stringify(storedMovies));
    setMoviesData(storedMovies);
  },[])

  const handleAddMovieClick = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleMovieSubmit = (newMovie) => {
    // Logic to handle the new movie submission
    console.log(newMovie);
    const localMovies = JSON.parse(localStorage.getItem("movies"));
    const nm = {...newMovie,id: localMovies.length + 1}
    const newMovies = [...localMovies,nm];
    localStorage.setItem("movies",JSON.stringify(newMovies));
    setMoviesData(newMovies);
    // Close the dialog after submission
    setDialogOpen(false);
  };

  const resetCache = () => {
     localStorage.setItem("movies", JSON.stringify(sampleMovies));
  }

  const handlDelete = (id) => {
    const storedMovies = JSON.parse(localStorage.getItem('movies'));
    const filteredMovies = storedMovies.filter((movie) => movie.id !== id);
    localStorage.setItem('movies',JSON.stringify(filteredMovies));
    setMoviesData(filteredMovies);
    navigate('/');
  }
  
  return (
    <div>
      <button onClick={resetCache}> Reset </button>
      <SortControl currentSelection={sortSelection} onSortChange={handleSortChange} />
      <button onClick={handleAddMovieClick} className="add-movie-button">
        Add Movie
      </button>
      <div className="movie-list">
        {moviesData.map((movie) => (
          <MovieTile key={movie.id} movieInfo={movie} onDelete={handlDelete}/>
        ))}
      </div>
      { isDialogOpen && <MovieDialog onClose={handleCloseDialog} onSubmit={handleMovieSubmit}/>}
    </div>
  );
};

export default Movies;
