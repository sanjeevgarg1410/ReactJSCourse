import React from 'react';
import ReactDOM from 'react-dom';
import FocusTrap from 'focus-trap-react';
// import './Dialog.css'; // Ensure you have the corresponding CSS file
import styles from '../styles/Dialog.module.css'

const Dialog = ({ title, children, onClose }) => {
  return ReactDOM.createPortal(
    <FocusTrap>
      <div className={styles.overlayDialog} onClick={onClose}>
        <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
          <div className={styles.dialogHeader}>
            <h2>{title}</h2>
            <button onClick={onClose} className={styles.closeButton}>×</button>
          </div>
          <div className="dialog-body">
            {children}
          </div>
        </div>
      </div>
    </FocusTrap>,
    document.body
  );
};

export default Dialog;
