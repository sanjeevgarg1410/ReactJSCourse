import React from 'react';
import styles from  '../styles/MovieTile.module.css'

const ContextMenu = ({ onDelete, onEdit }) => {
  return (
    <div className={styles.contextMenu}>
      <div onClick={onDelete} className={styles.contextMenuDiv}>Delete</div>
      <div onClick={onEdit} className={styles.contextMenuDiv} >Edit</div>
    </div>
  );
};

export default ContextMenu;
