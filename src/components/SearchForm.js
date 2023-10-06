import React from 'react';

class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: this.props.initialSearchQuery
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
        return (
            <div className="searchForm">
                <h1>Search</h1>
                <input value={this.state.query} onChange={this.handleInputChange} onKeyPress={this.handleKeyPress} className="searchInput"/>
                <button onClick={this.handleSearch} className="btn">Search</button>
            </div>
        );
    }
}



export default SearchForm;