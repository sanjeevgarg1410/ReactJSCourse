import React, { useState } from 'react';

function SearchForm(props) {

    const [query, setQuery] = useState('');
   
    handleInputChange = (e) => {
        setQuery(e.target.value);
    }

    handleSearch = () => {
        props.onSearch(query);
    }

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }


    const searchResults = props.results || [];
    return (
        <div className="searchForm">
            <h1>Search Form</h1>
            <input value={state.query} onChange={handleInputChange} onKeyPress={handleKeyPress} className="searchInput" placeholder='Search' name='search'/>
            <button onClick={handleSearch} className="btn" type='submit'>Search</button>
            <div className='search-results'>
                {searchResults.map( (result) =>{
                    return <div> {result} </div>
                })}
            </div>
        </div>
    );
}




export default SearchForm;