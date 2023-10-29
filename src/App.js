import React from 'react';


import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import sampleMovies from './data/samplemovies';
import './components/Movies.css'
import MovieDetails from './components/MovieDetails';
import SortControl from './components/SortControl';
import MovieTile from './components/MovieTile';
import Movies from './components/Movies';
import { useState } from 'react';



function App() {
    const movies = sampleMovies;
    const [sortSelection, setSortSelection] = useState('releaseDate');
    const [moviesData, setMoviesData] = useState(sampleMovies);

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

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route exact path="/" element={<Movies movies={moviesData} handleSortChange={handleSortChange} sortSelection={sortSelection}/>} />
          <Route path="/movie/:id" element={<MovieDetails/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
