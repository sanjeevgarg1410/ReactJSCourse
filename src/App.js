import React from 'react';


import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import sampleMovies from './data/samplemovies';
import './components/Movies.css'
import MovieDetails from './components/MovieDetails';
import Movies from './components/Movies';
import { useState, useEffect } from 'react';
import DialogDisplay from './components/DialogDisplay';
import MovieDialog from './components/MovieDialog';


function App() {
  
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Movies/>} />
          <Route path="/dialog" element={<DialogDisplay/>} />
          <Route path="/movie/:id" element={<MovieDetails/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;