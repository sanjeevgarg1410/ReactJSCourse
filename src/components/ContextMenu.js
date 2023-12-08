import React from 'react';

const ContextMenu = ({ onDelete, onEdit }) => {
  return (
    <div className="context-menu">
      <div onClick={onDelete}>Delete</div>
      <div onClick={onEdit}>Edit Movie</div>
    </div>
  );
};

export default ContextMenu;
