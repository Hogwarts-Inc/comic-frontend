import React from 'react';

import { DialogContent } from '@mui/material';

import { AddCanva } from 'src/views/ChapterCreate/AddCanva/AddCanva';

import { DialogStyle } from './styles';

interface DialogAddCanvaParams {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DialogAddCanva = ({ openDialog, setOpenDialog }: DialogAddCanvaParams) => {
  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <DialogStyle open={openDialog} onClose={handleClose}>
      <DialogContent>
        <AddCanva />
      </DialogContent>
    </DialogStyle>
  );
};
