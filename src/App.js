import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Outlet } from 'react-router-dom';
import './components/Movies.css'
import MovieListPage from './components/MovieListPage';
import MovieDialog from './components/MovieDialog'

function App() {  
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/movies" element={<MovieListPage/>} >
               <Route path=":movieId"  element={<MovieDialog/>}>
                       <Route path="edit" />
                </Route>
               <Route path="new" element={<MovieDialog />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;