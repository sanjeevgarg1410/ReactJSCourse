// MovieDialog.js
import React, { useState , useEffect} from 'react';
import Dialog from './Dialog';
import MovieForm from './MovieForm';
import {  useOutletContext , useNavigate} from 'react-router-dom';
import MovieDetails from './MovieDetails';


const MovieDialog = () => {
  const navigate = useNavigate();
  const context = useOutletContext();
  const onSubmitHandler = context.onSubmitHandler;
  const initialMovieInfo = context.initialMovieInfo;
  const displayMode = context.display;
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [movieInfo, setMovieInfo] = useState(context.initialMovieInfo || null);


  const handleFormSubmit = (movieData) => {
    onSubmitHandler(movieData); // Call the provided onMovieUpdate function with the new movie data
    navigate("/movies");
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    navigate("/movies");
  };

  // Automatically open the dialog if initialMovieInfo is provided
  useEffect(() => {
      handleOpenDialog();
  }, [initialMovieInfo]);

  return (
    <>
      {isDialogOpen && (
        <Dialog
          title={displayMode === 'details' ? "Movie Details" : displayMode === 'edit' ?  'Edit Movie' : 'Add Movie'}
          onClose={handleCloseDialog}
        >
          {displayMode !== 'details' ?  <MovieForm
            initialMovieInfo={movieInfo}
            onSubmit={handleFormSubmit}
          />: <MovieDetails/>}
         
        </Dialog>
      )}
    </>
  );
};

export default MovieDialog;
