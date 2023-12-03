import React, { useState, useEffect } from 'react';
import {useNavigate, useParams, Outlet , Link , useOutletContext} from 'react-router-dom'
import SortControl from './SortControl';
import MovieTile from './MovieTile';
import MovieDialog from './MovieDialog';
import { APP_URL } from '../const';
import GenreSelect from './GenreSelect';
import SearchForm from './SearchForm';
import MovieDetails from './MovieDetails'
import Dialog from './Dialog'
import './MovieListPage.css'


const MovieListPage = () => {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const searchParams = new URL(window.location).searchParams;
  const [editMode, setEditMode] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [sortSelection, setSortSelection] = useState(searchParams.get('sortBy')|| 'release_date');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchBy, setSearchBy] = useState('title');
  const [genre, setGenre] = useState(searchParams.get('filter')|| 'ALL');
  const [sortOrder, setSortOrder] = useState(searchParams.get('sortOrder') || 'asc');

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(movieId);
  const [movieEdit, setMovieEdit] = useState(null);

  const [displayMode, setDisplayMode] = useState('list');

  const openModal = (movieId) => {
    setSelectedMovieId(movieId);
    navigate(`/movies/${movieId}`);
  };

  const closeModal = () => {
    setSelectedMovieId(null);
    navigate("/movies");
  };

  useEffect( () => {
       if(movieId) {
         setDisplayMode("details");
       }
       if(window.location.pathname.endsWith('/edit')) {
        setDisplayMode("edit");
      }
  },[])

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
    setEditMode(false); // Close the edit dialog
  };

  const handleEditClick = (movieEdit) => {
    navigate(`/movies/${movieEdit.id}/edit`);
  };


  const handleAddMovieLinkClick = () => {
    navigate("/movies/new?sortBy=release_date&sortOrder=asc");
  }
  
  return (
    <div>
      <button onClick={handleAddMovieLinkClick}>Add Movie</button>
      <SearchForm  onSearch= {onSearch}/>
      <div className='topheader'>
        <GenreSelect genres={["ALL","THRILLER","COMEDY","ACTION"]} selectedGenre = {genre} onSelect = {onSelect}/>
        <SortControl currentSelection={sortSelection} onSortChange={handleSortChange} />
      </div>
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieTile key={movie.id} movieInfo={movie} onDelete={handlDelete} handleClick={(movie) => openModal(movie.id)} handleEditClick={handleEditClick}/>
        ))}
      </div>
      <Outlet context={{movieSubmitHandler: handleMovieSubmit , display: displayMode ,   initialMovieInfo: movieEdit }}/>
    </div>
  );
};

export default MovieListPage;
