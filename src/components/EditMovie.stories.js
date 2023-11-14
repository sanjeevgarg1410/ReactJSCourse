import React from 'react';
import MovieDialog from './MovieDialog';

export default {
  title: 'Movie Dialog/Edit',
  component: MovieDialog,
};

const Template = (args) => <MovieDialog {...args} />;

export const EditMovie = Template.bind({});
EditMovie.args = {
  isOpen: true,
  initialMovieInfo: {
    // ... some movie data to edit
  },
  onClose: () => console.log('Close dialog'),
  onSubmit: (movieData) => console.log('Edited movie data', movieData),
};
