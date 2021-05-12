import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import React from 'react';

const Modal = ({ title, open, handleClose, children }) => {
  return (
    <Dialog
      scroll='paper'
      open={open}
      onClose={handleClose}
      maxWidth='lg'
      style={
        {
          // position: 'relative',
        }
      }
      aria-labelledby='form-dialog-title'
    >
      <DialogTitle id='form-dialog-title'>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default Modal;
