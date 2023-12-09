import React, { useState , useEffect} from 'react';
import styles from '../styles/MovieListPage.module.css';

function SearchForm(props) {

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
        <div className={styles.searchForm}>
            <h1>Find a Movie</h1>
            <input value={query} onChange={handleInputChange} onKeyPress={handleKeyPress} className={styles.searchInput} placeholder='Search' name='search' />
            <button onClick={handleSearch} className="btn" type='submit'>Search</button>
        </div>
    );
}

export default SearchForm;