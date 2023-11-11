import React from 'react';
import MovieDialog from './MovieDialog';

// This default export determines where your story goes in the story list
export default {
  title: 'Movie Dialog/Add',
  component: MovieDialog,
};

const Template = (args) => <MovieDialog {...args} />;

export const AddMovie = Template.bind({});
AddMovie.args = {
  initialMovieInfo: null, // Since it's adding a new movie, no initial movie info
  onClose: () => console.log('Close dialog'),
  onSubmit: (movieData) => console.log('Movie data', movieData),
};
