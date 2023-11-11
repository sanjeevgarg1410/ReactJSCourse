// MovieDialog.js
import React, { useState , useEffect} from 'react';
import Dialog from './Dialog';
import MovieForm from './MovieForm';

const MovieDialog = ({ initialMovieInfo, onSubmit, onClose }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [movieInfo, setMovieInfo] = useState(initialMovieInfo || null);

  const handleFormSubmit = (movieData) => {
    // Update the movie data (you would typically send this data to a server or update some global state)
    console.log(movieData); // Placeholder for actual update logic
    onSubmit(movieData); // Call the provided onMovieUpdate function with the new movie data
    onClose(); // Close the dialog after submission
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    onClose();
  };

  // Automatically open the dialog if initialMovieInfo is provided
  useEffect(() => {
      handleOpenDialog();
  }, [initialMovieInfo]);

  return (
    <>
      {isDialogOpen && (
        <Dialog
          title={movieInfo ? "Edit Movie" : "Add Movie"}
          onClose={handleCloseDialog}
        >
          <MovieForm
            initialMovieInfo={movieInfo}
            onSubmit={handleFormSubmit}
          />
        </Dialog>
      )}
    </>
  );
};

export default MovieDialog;
