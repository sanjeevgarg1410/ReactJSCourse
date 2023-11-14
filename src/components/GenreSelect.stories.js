// GenreSelect.stories.js

import React from 'react';
import GenreSelect from './GenreSelect';

export default {
  title: 'GenreSelect', // The title of your Storybook section
  component: GenreSelect, // The component you want to showcase
  argTypes: {
    onSelect: { action: 'selected' },
  },
};

const genres = ['Action', 'Adventure', 'Comedy', 'Drama', 'Science Fiction'];

export const Default = (args) => <GenreSelect {...args} />;
Default.args = {
  genres: genres,
  selectedGenre: '',
};

export const WithSelectedGenre = (args) => <GenreSelect {...args} />;
WithSelectedGenre.args = {
  genres: genres,
  selectedGenre: 'Adventure',
};
