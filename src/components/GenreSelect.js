import React from "react";

function GenreSelect (props) {

  const handleGenreClick = (genre) => {
    props.onSelect(genre);
  };

 
    return (
      <div className="genres">
        {props.genres.map((genre) => (
          <button
            key={genre}
            className={`genreBtn ${
              props.selectedGenre === genre ? "selected" : ""
            }`}
            onClick={() => handleGenreClick(genre)}
          >
            {genre}
          </button>
        ))}
      </div>
    );
  }

export default GenreSelect;
