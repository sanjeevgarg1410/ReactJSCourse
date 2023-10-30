import React from 'react';

class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: this.props.initialSearchQuery || '',
        };
    }

    handleInputChange = (e) => {
        this.setState({ query: e.target.value });
    }

    handleSearch = () => {
        this.props.onSearch(this.state.query);
    }

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.handleSearch();
        }
    }

    render() {
        const searchResults = this.props.results || [];
        return (
            <div className="searchForm">
                <h1>Search Form</h1>
                <input value={this.state.query} onChange={this.handleInputChange} onKeyPress={this.handleKeyPress} className="searchInput" placeholder='Search' name='search'/>
                <button onClick={this.handleSearch} className="btn" type='submit'>Search</button>
                <div className='search-results'>
                    {searchResults.map( (result) =>{
                        return <div> {result} </div>
                    })}
                </div>
            </div>
        );
    }
}



export default SearchForm;