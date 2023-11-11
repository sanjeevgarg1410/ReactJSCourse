// App.js
import React, { useState } from 'react';
import Dialog from './Dialog';

function DialogDisplay() {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div>
      <button onClick={openDialog}>Open Dialog</button>

      {isDialogOpen && (
        <Dialog title="Custom Modal" onClose={closeDialog}>
          <p>This is the custom content of the dialog.</p>
        </Dialog>
      )}
    </div>
  );
}

export default DialogDisplay;
