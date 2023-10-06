import Counter from "./components/Counter";
import GenreSelect from "./components/GenreSelect";
import SearchForm from "./components/SearchForm";
import React from 'react';
import './App.css'

function App() {
  const handleSearch = (query) => {
      console.log('Searching for:', query);
      window.alert(`Searching for: ${query}`);
  };

  const handleSelectGenre = (genre) => {
      console.log('Selected Genre:', genre);
      window.alert(`Selected Genre: ${genre}`);
  };

  return (
      <div className="app">
          <Counter initialValue={0} />
          <SearchForm initialSearchQuery='sanjeev' onSearch={handleSearch} />
          <GenreSelect genres={['Action', 'Drama', 'Comedy']} selectedGenre='Drama' onSelect={handleSelectGenre} />
      </div>
  );
}

export default App;