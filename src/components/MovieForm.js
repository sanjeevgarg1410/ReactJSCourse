import React, { useState, useEffect } from 'react';
import './MovieForm.css'

function MovieForm({ initialMovieInfo, onSubmit }) {
  const [movie, setMovie] = useState({
    title: '',
    runtime: 0,
    overview: '',
    release_date: '',
    poster_path: '',
    genres: []
  });

  useEffect(() => {
    if (initialMovieInfo) {
      setMovie(initialMovieInfo);
    } else {
      setMovie({
        title: '',
        runtime: 0,
        overview: '',
        release_date: '',
        poster_path: '',
        genres: []
      });
    }
  }, [initialMovieInfo]);

  const handleChange = (e) => {
    var { name, value, type } = e.target;
    if(type === "number")
      value = parseFloat(value);
    setMovie({ ...movie, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(movie,"POST");
  };

  return (
    <div className="movie-form">
    <form onSubmit={handleSubmit}>
      <div >
        <label htmlFor="title">Title</label>
        <input
        id="title"
          name="title"
          type="text"
          value={movie.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="runtime">Runtime</label>
        <input
          id="runtime"
          name="runtime"
          type="number"
          value={movie.runtime}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="overview">Overview</label>
        <textarea
          id="overview"
          name="overview"
          value={movie.overview}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="release_date">Release Date</label>
        <input
          id="release_date"
          name="release_date"
          type="date"
          value={movie.release_date}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="poster_path">Movie URL</label>
        <input
          id="poster_path"
          name="poster_path"
          type="url"
          value={movie.poster_path}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="genres">Genres(comma, separated)</label>
        <input 
          id="genres"
          name="genres"
          type="text"
          value={movie.genres}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
    </div>
  );
}

export default MovieForm;
