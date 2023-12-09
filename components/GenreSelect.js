import React from "react";
import styles from '../styles/MovieListPage.module.css'


function GenreSelect (props) {

  const handleGenreClick = (genre) => {
    props.onSelect(genre);
  };

 
    return (
      <div className={styles.genres}>
        {props.genres.map((genre) => (
          <button
            key={genre}
            className={
              props.selectedGenre === genre ? styles.genresButtonSelected : styles.genresButton
            }
            onClick={() => handleGenreClick(genre)}
          >
            {genre}
          </button>
        ))}
      </div>
    );
  }

export default GenreSelect;
