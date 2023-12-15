import React from 'react';

import { DialogContent, Dialog } from '@mui/material';

import { AddCanva } from 'src/views/ChapterCreate/AddCanva/AddCanva';

interface DialogAddCanvaParams {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DialogAddCanva = ({ openDialog, setOpenDialog }: DialogAddCanvaParams) => {
  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <Dialog open={openDialog} onClose={handleClose} maxWidth={false}>
        <DialogContent>
          <AddCanva />
        </DialogContent>
      </Dialog>
    </div>
  );
};
