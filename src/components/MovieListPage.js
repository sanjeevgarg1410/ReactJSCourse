import React, { useState, useEffect } from 'react';
import {useNavigate, useParams, Outlet , Link , useOutletContext} from 'react-router-dom'
import SortControl from './SortControl';
import MovieTile from './MovieTile';
import { APP_URL } from '../const';
import GenreSelect from './GenreSelect';
import SearchForm from './SearchForm';
import './MovieListPage.css'


const MovieListPage = () => {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const searchParams = new URL(window.location).searchParams;
  const [movies, setMovies] = useState([]);
  const [sortSelection, setSortSelection] = useState(searchParams.get('sortBy')|| 'release_date');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [searchBy, setSearchBy] = useState('title');
  const [genre, setGenre] = useState(searchParams.get('filter')|| 'ALL');
  const [sortOrder, setSortOrder] = useState(searchParams.get('sortOrder') || 'desc');
  const [selectedMovieId, setSelectedMovieId] = useState(movieId);
  const [movieEdit, setMovieEdit] = useState(null);

  const openModal = (movieId) => {
    setSelectedMovieId(movieId);
    navigate(`/movies/${movieId}`);
  };

  const closeModal = () => {
    setSelectedMovieId(null);
    navigate("/movies");
  };

  useEffect(() => {
    let urlStr = `?sortBy=${sortSelection}&sortOrder=${sortOrder}`;
    if(searchQuery && searchQuery !== '') {
      urlStr = `${urlStr}&search=${searchQuery}&searchBy=${searchBy}`;
    }
    if(genre !== 'ALL') {
      urlStr = `${urlStr}&filter=${genre}`;
    }
    if(selectedMovieId) {
      urlStr=selectedMovieId;
    }
    navigate(urlStr ,{ replace: true });
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

  const handleMovieSubmit = (newMovie) => {
    // Logic to handle the new movie submission
    newMovie = {...newMovie, genres: newMovie.genres?.split(",") , runtime: Number(newMovie.runtime) }
  
    const url = new URL(`${APP_URL}/movies`);
    fetch(url , {
      method: "POST",
      body: JSON.stringify(newMovie),
      headers: {
        "content-type": "application/json"
      }
    }).then(res => res.json()).then((newMovie)=> {
       const newMovies = [newMovie, ...movies, ];
       setMovies(newMovies);
    })

    // navigate("/movies")
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
    setSearchQuery('');
    setGenre(selectedGenre);
  }

  const handleMovieUpdate = (newMovie) => {
    // Logic to handle the new movie submission
    if(typeof(newMovie.genres) === 'string')
        newMovie = {...newMovie, genres: newMovie.genres?.split(",")}
    const url = new URL(`${APP_URL}/movies`);
    fetch(url , {
      method: "PUT",
      body: JSON.stringify(newMovie),
      headers: {
        "content-type": "application/json"
      }
    }).then(res => res.json()).then((newMovie)=> {
      setMovies((prevMovies) =>
        prevMovies.map((oldMovie) =>
          oldMovie.id === newMovie.id ? newMovie : oldMovie
        )
      );
    })
    navigate("/movies");
  };

  const handleEditClick = (movieEdit) => {
    setMovieEdit(movieEdit);
    navigate(`/movies/${movieEdit.id}/edit`);
  };


  const handleAddMovieLinkClick = () => {
    navigate("/movies/new?sortBy=release_date&sortOrder=asc");
  }

  let displayMode = '';
  
  if(movieId) {
    displayMode = "details"
  }
  if(window.location.pathname.endsWith('/edit')) {
    displayMode = "edit"
  }
  if(window.location.pathname.endsWith('/new')) {
    displayMode = "new"
  }

  let movieSubmitHandler = displayMode === 'new' ? handleMovieSubmit : handleMovieUpdate;

  return (
    <div>
      <button onClick={handleAddMovieLinkClick}>Add Movie</button>
      <SearchForm  onSearch= {onSearch} searchQuery = {searchQuery} />
      <div className='topheader'>
        <GenreSelect genres={["ALL","THRILLER","COMEDY","ACTION"]} selectedGenre = {genre} onSelect = {onSelect}/>
        <SortControl currentSelection={sortSelection} onSortChange={handleSortChange} />
      </div>
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieTile key={movie.id} movieInfo={movie} onDelete={handlDelete} handleClick={(movie) => openModal(movie.id)} handleEditClick={handleEditClick}/>
        ))}
      </div>
      <Outlet context={{onSubmitHandler: movieSubmitHandler , display: displayMode ,   initialMovieInfo: movieEdit }}/>
    </div>
  );
};

export default MovieListPage;
