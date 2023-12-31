import React from "react";

class GenreSelect extends React.Component {
  handleGenreClick = (genre) => {
    this.props.onSelect(genre);
  };

  render() {
    return (
      <div className="genreSelect">
        <h1>Genre</h1>
        {this.props.genres.map((genre) => (
          <button
            key={genre}
            className={`genreBtn ${
              this.props.selectedGenre === genre ? "selected" : ""
            }`}
            onClick={() => this.handleGenreClick(genre)}
          >
            {genre}
          </button>
        ))}
      </div>
    );
  }
}

export default GenreSelect;
