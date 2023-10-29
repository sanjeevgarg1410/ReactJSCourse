// SearchForm.stories.js

import React from 'react';
import SearchForm from './SearchForm';

export default {
  title: 'SearchForm', // The title of your storybook section
  component: SearchForm, // The component you want to showcase
  argTypes: {
    onSearch: { action: 'search' },
  },
};

export const Default = (args) => <SearchForm {...args} />;
Default.args = {
  initialSearchQuery: '',
  results: [],
};

export const WithResults = (args) => <SearchForm {...args} />;
WithResults.args = {
  initialSearchQuery: 'React Storybook',
  results: ['Result 1', 'Result 2', 'Result 3'],
};
