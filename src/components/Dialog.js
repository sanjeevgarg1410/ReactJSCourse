// Dialog.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Portal } from 'react-portal';
import FocusTrap from 'focus-trap-react';
import './Dialog.css'; // Ensure you have the corresponding CSS file

const Dialog = ({ title, children, onClose }) => {
  return ReactDOM.createPortal(
    <Portal>
      <FocusTrap>
        <div className="dialog-overlay">
          <div className="dialog">
            <div className="dialog-header">
              <h2>{title}</h2>
              <button onClick={onClose} className="close-button">×</button>
            </div>
            <div className="dialog-body">
              {children}
            </div>
          </div>
        </div>
      </FocusTrap>
    </Portal>,
    document.body
  );
};

export default Dialog;
