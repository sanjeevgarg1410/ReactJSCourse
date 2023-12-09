import React, { useState, useEffect } from 'react';
import Dialog from './Dialog';
import MovieDetails from './MovieDetails';
import MovieForm from './MovieForm'

const MovieDialog = ({ onSubmitHandler, initialMovieInfo, displayMode, onClose }) => {
  const [isDialogOpen, setDialogOpen] = useState(true);
  const [movieInfo, setMovieInfo] = useState(initialMovieInfo || null);

  const handleFormSubmit = (movieData) => {
    onSubmitHandler(movieData); // Call the provided onSubmitHandler function with the new movie data
    onClose(); // Close the dialog
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  // Automatically open the dialog if initialMovieInfo is provided
  useEffect(() => {
    if (initialMovieInfo) {
      handleOpenDialog();
    }
  }, [initialMovieInfo]);

  return (
    <>
      {isDialogOpen && (
        <Dialog
          title={displayMode === 'details' ? "Movie Details" : displayMode === 'edit' ? 'Edit Movie' : 'Add Movie'}
          onClose={onClose} // Use passed onClose prop to close the dialog
        >
          {displayMode !== 'details' ? (
            <MovieForm
              initialMovieInfo={movieInfo}
              onSubmit={handleFormSubmit}
            />
          ) : (
            <MovieDetails />
          )}
        </Dialog>
      )}
    </>
  );
};

export default MovieDialog;
