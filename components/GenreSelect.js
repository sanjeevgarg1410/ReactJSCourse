import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

// GenreSelect component
function GenreSelect(props) {
  const router = useRouter();

  // Inline styles
  const defaultButtonStyle = {
    padding: '8px',
    marginRight: '10px',
  };

  const selectedButtonStyle = {
    color: 'black',
    padding: '8px',
    marginRight: '10px',
    backgroundColor: 'rgb(186, 167, 167)',
  };

  const genresListStyling = {
    display: 'flex',
  };

  return (
    <div style={genresListStyling}>
      {props.genres.map((genre) => (
        <Link
          key={genre}
          href={{
            pathname: '/movies',
            query: {
              ...router.query,
              filter: encodeURIComponent(genre),
            },
          }}
        >
          <span
            style={
              props.selectedGenre === genre
                ? selectedButtonStyle
                : defaultButtonStyle
            }
          >
            {genre}
          </span>
        </Link>
      ))}
    </div>
  );
}

export default GenreSelect;
