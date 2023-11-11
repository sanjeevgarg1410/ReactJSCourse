import React, { useState, useEffect } from 'react';
import './MovieForm.css'

function MovieForm({ initialMovieInfo, onSubmit }) {
  const [movie, setMovie] = useState({
    name: '',
    title: '',
    rating: '',
    runtime: '',
    overview: '',
    releaseDate: '',
    movieUrl: '',
    genre: ''
  });

  useEffect(() => {
    if (initialMovieInfo) {
      setMovie(initialMovieInfo);
    } else {
      setMovie({
        name: '',
        title: '',
        rating: '',
        runtime: '',
        overview: '',
        releaseDate: '',
        movieUrl: '',
        genre: ''
      });
    }
  }, [initialMovieInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie({ ...movie, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(movie);
  };

  return (
    <div className="movie-form">
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={movie.name}
          onChange={handleChange}
        />
      </div>
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
        <label htmlFor="rating">Rating</label>
        <input
          id="rating"
          name="rating"
          type="text"
          value={movie.rating}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="runtime">Runtime</label>
        <input
          id="runtime"
          name="runtime"
          type="text"
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
        <label htmlFor="releasedate">Release Date</label>
        <input
          id="releasedate"
          name="releaseDate"
          type="date"
          value={movie.releaseDate}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="movieurl">Movie URL</label>
        <input
          id="movieurl"
          name="movieUrl"
          type="url"
          value={movie.movieUrl}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="genre">Genre</label>
        <input 
          id="genre"
          name="genre"
          type="text"
          value={movie.genre}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
    </div>
  );
}

export default MovieForm;
