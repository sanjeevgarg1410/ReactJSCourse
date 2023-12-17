import React, { useState, useRef, useEffect } from 'react';
import ContextMenu from './ContextMenu';
import Link from 'next/link';

const movieTileStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  overflow: 'hidden',
  backgroundColor: '#ffffff',
  padding: '15px',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
};

const movieTileImgStyle = {
  width: '100%',
  height: 'auto',
  borderBottom: '1px solid #eaeaea',
};

const movieTileH2Style = {
  marginTop: '10px',
  fontSize: '1.2em',
  textAlign: 'center',
};

const contextMenuStyle = {
  position: 'absolute',
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  padding: '8px',
  zIndex: '1',
};

const MovieTile = ({ movieInfo, handleClick, handleEditClick, handleDeleteClick }) => {
  const { id, title, poster_path } = movieInfo;

  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const contextMenuRef = useRef(null);

  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
  };

  const closeContextMenu = () => {
    setContextMenuPosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
        closeContextMenu();
      }
    };

    // Add event listeners
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup event listeners on unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Only render the context menu when the component is mounted in the browser
  const isClient = typeof window === 'object';

  return (
    <div style={movieTileStyle} data-testid={`movie-tile-${id}`} onContextMenu={handleContextMenu}>
       <Link href={`/movies/${id}`}>
        <div onClick={() => handleClick(movieInfo)}>
          <img src={poster_path} alt={title} style={movieTileImgStyle} />
          <h2 style={movieTileH2Style}>{title}</h2>
        </div>
      </Link>
      {isClient && contextMenuPosition.x !== 0 && (
        <div
          ref={contextMenuRef}
          style={{
            top: contextMenuPosition.y,
            left: contextMenuPosition.x,
            ...contextMenuStyle }}
        >
          <ContextMenu
            onDelete={() => {
              handleDeleteClick(id);
              closeContextMenu();
            }}
            onEdit={() => {
              handleEditClick(movieInfo);
              closeContextMenu();
            }}
          />
        </div>
      )}
    </div>
  );
};

export default MovieTile;
