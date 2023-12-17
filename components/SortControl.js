import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const SortControl = ({ currentSelection }) => {
  const router = useRouter();
  const { pathname, query } = router;

  const linkStyle = {
    marginRight: '10px', // Adjust spacing as needed
    padding: '5px 10px',
    cursor: 'pointer',
    color: '#000', // Default text color
    textDecoration: 'none',
  };

  const selectedStyle = {
    backgroundColor: 'rgb(186, 167, 167)',
    color: '#000', // Adjust the text color for selected state
  };

  return (
    <div className="sort-control">
      <div>
        <Link href={{ pathname, query: { ...query, sortBy: 'release_date' } }}>
          <span
            style={{
              ...linkStyle,
              ...(currentSelection === 'release_date' ? selectedStyle : {}),
            }}
          >
            Release Date
          </span>
        </Link>
        <Link href={{ pathname, query: { ...query, sortBy: 'title' } }}>
          <span
            style={{
              ...linkStyle,
              ...(currentSelection === 'title' ? selectedStyle : {}),
            }}
          >
            Title
          </span>
        </Link>
      </div>
    </div>
  );
};

export default SortControl;
