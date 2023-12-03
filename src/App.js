import React from 'react';


import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './components/Movies.css'
import MovieDetails from './components/MovieDetails';
import MovieListPage from './components/MovieListPage';
import DialogDisplay from './components/DialogDisplay';
function App() {
  
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<MovieListPage/>} />
          <Route path="/dialog" element={<DialogDisplay/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;