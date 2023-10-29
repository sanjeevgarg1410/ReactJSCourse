import Counter from "./components/Counter";
import GenreSelect from "./components/GenreSelect";
import SearchForm from "./components/SearchForm";
import React, { useState } from 'react';
import './App.css'

function App() {
  const [results , setResults] = useState([])

  const handleSearch = (query) => {
     const queryResults = [
        "first result",
        "second result",
        query
     ]
     setResults(queryResults);
  };

  const handleSelectGenre = (genre) => {
      console.log('Selected Genre:', genre);
      window.alert(`Selected Genre: ${genre}`);
  };

  return (
      <div className="app">
          <Counter initialValue={0} />
          <SearchForm initialSearchQuery='sanjeev' onSearch={handleSearch} results={results} />
          <GenreSelect genres={['Action', 'Drama', 'Comedy']} selectedGenre='Drama' onSelect={handleSelectGenre} />
      </div>
  );
}

export default App;