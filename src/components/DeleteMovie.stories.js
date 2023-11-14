import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import MovieTile from './MovieTile';
import sampleMovies from '../data/samplemovies';

export default {
  title: 'Movie Tile/Delete',
  component: MovieTile,
  decorators: [(Story) => <MemoryRouter><Story/></MemoryRouter>], // Decorator to wrap the story in a MemoryRouter
};

const Template = (args) => <MovieTile {...args} />;

export const Default = Template.bind({});
Default.args = {
  movieInfo: sampleMovies[0],
  onDelete: (id) => alert(`Delete movie with ID ${id}`),
};
