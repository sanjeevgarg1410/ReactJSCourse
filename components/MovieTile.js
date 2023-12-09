import React, { useState, useRef, useEffect } from 'react';
import ContextMenu from './ContextMenu';
import styles from '../styles/MovieTile.module.css';

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
    <div className={styles.movieTile} data-testid={`movie-tile-${id}`} onContextMenu={handleContextMenu}>
      <div onClick={() => handleClick(movieInfo)}>
        <img src={poster_path} alt={title} className={styles.imgStyle} />
        <h2>{title}</h2>
      </div>
      {isClient && contextMenuPosition.x !== 0 && (
        <div
          ref={contextMenuRef}
          className={styles.contextMenu}
          style={{
            top: contextMenuPosition.y,
            left: contextMenuPosition.x,
          }}
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
