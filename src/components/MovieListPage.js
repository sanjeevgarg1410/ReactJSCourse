import React, { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom'
import SortControl from './SortControl';
import MovieTile from './MovieTile';
import MovieDialog from './MovieDialog';
import { APP_URL } from '../const';
import GenreSelect from './GenreSelect';
import SearchForm from './SearchForm';
import './MovieListPage.css'


const MovieListPage = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [sortSelection, setSortSelection] = useState(params.sortBy || 'release_date');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchBy, setSearchBy] = useState('title');
  const [genre, setGenre] = useState(params.filter || 'ALL');
  const [sortOrder, setSortOrder] = useState(params.sortOrder || 'asc');

  useEffect(() => {
    console.log(params);
    let urlStr = `?sortBy=${sortSelection}&sortOrder=${sortOrder}`;
    if(searchQuery && searchQuery !== '') {
      urlStr = `${urlStr}&search=${searchQuery}&searchBy=${searchBy}`;
    }
    if(genre !== 'ALL') {
      urlStr = `${urlStr}&filter=${genre}`;
    }
    navigate(urlStr);
  }, [sortSelection, genre, searchQuery, searchBy, sortOrder,navigate])


  useEffect(() => {
    let urlStr = `${APP_URL}/movies?sortBy=${sortSelection}&sortOrder=${sortOrder}`;
    if(searchQuery && searchQuery !== '') {
      urlStr = `${urlStr}&search=${searchQuery}&searchBy=${searchBy}`;
    }
    if(genre !== 'ALL') {
      urlStr = `${urlStr}&filter=${genre}`;
    }
    const url = new URL(urlStr);
    fetch(url).then((res) => res.json()).then((resJson) => {
      setMovies(resJson.data);
    });
  }, [sortSelection, genre, searchQuery, searchBy, sortOrder])

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

  const onSearch = (query) => {
    setSearchQuery(query);
  }

  const handleSortChange = (value) => {
    setSortSelection(value);
  };

  const onSelect = (selectedGenre) => {
    setGenre(selectedGenre);
  }

  return (
    <div>
      <button onClick={handleAddMovieClick} className="add-movie-button">
        Add Movie
      </button>
      <SearchForm  onSearch= {onSearch}/>
      <div className='topheader'>
        <GenreSelect genres={["ALL","THRILLER","COMEDY","ACTION"]} selectedGenre = {genre} onSelect = {onSelect}/>
        <SortControl currentSelection={sortSelection} onSortChange={handleSortChange} />
      </div>
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
