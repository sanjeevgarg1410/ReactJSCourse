import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Movies } from './Movies';
import sampleMovies from '../data/samplemovies';

// Initialize localStorage with your sample data
global.localStorage.setItem('movies', JSON.stringify(sampleMovies));

export default {
  title: 'Component/Movies',
  component: Movies,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <Story />
      </MemoryRouter>
    ),
  ],
};

const Template = (args) => <Movies {...args} />;

export const DefaultView = Template.bind({});
