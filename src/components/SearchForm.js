import React, { useState } from 'react';

function SearchForm(props) {

    const [query, setQuery] = useState('');

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    }

    const handleSearch = () => {
        props.onSearch(query);
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }
    
    return (
        <div className="searchForm">
            <h1>Find a Movie</h1>
            <input value={query} onChange={handleInputChange} onKeyPress={handleKeyPress} className="searchInput" placeholder='Search' name='search' />
            <button onClick={handleSearch} className="btn" type='submit'>Search</button>
        </div>
    );
}




export default SearchForm;