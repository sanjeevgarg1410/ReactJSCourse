import React, { useState, useRef, useEffect } from 'react';
import ContextMenu from './ContextMenu';
import './MovieTile.css';

const MovieTile = ({ movieInfo, handleClick, handleEditClick, handleDeleteClick }) => {
  const { id, title, poster_path } = movieInfo;
  const imgStyle = {
    maxWidth: '150px',
    maxHeight: '200px',
  };

  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });

  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
  };

  const closeContextMenu = () => {
    setContextMenuPosition({ x: 0, y: 0 });
  };

  const contextMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
        closeContextMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="movie-tile" data-testid={`movie-tile-${id}`} onContextMenu={handleContextMenu}>
      <div onClick={() => handleClick(movieInfo)}>
        <img src={poster_path} alt={title} style={imgStyle} />
        <h2>{title}</h2>
      </div>
      {contextMenuPosition.x !== 0 && (
        <div
          ref={contextMenuRef}
          style={{
            position: 'fixed',
            top: contextMenuPosition.y,
            right: window.innerWidth - contextMenuPosition.x,
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
