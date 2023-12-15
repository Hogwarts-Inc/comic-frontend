import React from 'react';

import { DialogContent, Dialog } from '@mui/material';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { Route } from 'src/constants/routes';
import { apisCanvas } from 'src/services/apiConfig';
import { RootState } from 'src/store/rootReducer';
import { resetAddCanva, setActiveStep } from 'src/store/slices/add-canva/actions';
import { selectActiveStep, selectCanvaData } from 'src/store/slices/add-canva/selectors';
import { AddCanva } from 'src/views/ChapterCreate/AddCanva/AddCanva';
import { DataReview } from 'src/views/ChapterCreate/ChapterReview/DataReview';

interface DialogAddCanvaParams {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DialogAddCanva = ({ openDialog, setOpenDialog }: DialogAddCanvaParams) => {
  const dispatch = useDispatch();
  const { push } = useRouter();

  const { canvaData, activeStep } = useSelector((state: RootState) => ({
    canvaData: selectCanvaData(state),
    activeStep: selectActiveStep(state),
  }));

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleNext = async () => {
    dispatch(setActiveStep(activeStep + 1));
  };

  const handleSubmit = async () => {
    try {
      await apisCanvas.postCanva({ chapter_id: canvaData.chapterId, images: canvaData.files });
      dispatch(resetAddCanva());

      handleClose();
      push(Route.home);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <Dialog open={openDialog} onClose={handleClose} maxWidth={false}>
        <DialogContent>
          {activeStep === 0 && (
            <AddCanva context="canva" onNext={handleNext} />
          )}
          {activeStep === 1 && <DataReview context="canva" values={canvaData} onNext={handleSubmit} />}
        </DialogContent>
      </Dialog>
    </div>
  );
};
