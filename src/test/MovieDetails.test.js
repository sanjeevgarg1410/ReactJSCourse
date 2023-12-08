import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import MovieDetails from '../components/MovieDetails';


// Mocking the fetch function to simulate API calls
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ title: 'Test Movie', release_date: '2023-01-01' }),
  })
);

describe('MovieDetails component', () => {
  beforeEach(() => {
    // Clearing fetch mock calls before each test
    global.fetch.mockClear();
  });

  it('renders movie details correctly', async () => {
    render(
      <MemoryRouter initialEntries={['/movies/123']}>
        <Routes>
          <Route path="/movies/:id" element={<MovieDetails />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for the component to fetch movie details
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      console.log('Mock fetch called with:', global.fetch.mock.calls[0][0]);
    });

    // Check if movie details are rendered
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('Release Date: 2023-01-01')).toBeInTheDocument();
    // Add more assertions for other details as needed
  });
});
