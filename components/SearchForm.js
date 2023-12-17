import React, { useState , useEffect} from 'react';

function SearchForm(props) {


    const searchFormStyle = {
        margin: 'auto',
        width: '50%',
      };
      
    const searchFormInputStyle = {
    marginRight: '20px',
    };

    const [query, setQuery] = useState();

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

    useEffect(()=> {
        setQuery(props.searchQuery)
    },[])
    
    return (
        <div style={searchFormStyle}>
            <h1>Find a Movie</h1>
            <input value={query} onChange={handleInputChange} onKeyPress={handleKeyPress} style={searchFormInputStyle} placeholder='Search' name='search' />
            <button onClick={handleSearch} className="btn" type='submit'>Search</button>
        </div>
    );
}

export default SearchForm;