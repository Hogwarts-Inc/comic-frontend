import React, { useState } from 'react';

import { DialogContent, Dialog } from '@mui/material';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { Route } from 'src/constants/routes';
import { apisCanvas } from 'src/services/api';
import { RootState } from 'src/store/rootReducer';
import { setActiveStep } from 'src/store/slices/canva-creator/reducer';
import { selectActiveStep, selectCanvaData } from 'src/store/slices/canva-creator/selectors';
import { AddCanva } from 'src/views/ChapterCreate/AddCanva/AddCanva';
import { DataReview } from 'src/views/ChapterCreate/ChapterReview/DataReview';

interface DialogAddCanvaParams {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  onClose?: () => void;
}

export const DialogAddCanva = ({ openDialog, setOpenDialog, onClose }: DialogAddCanvaParams) => {
  const dispatch = useDispatch();
  const { push } = useRouter();

  const { canvaData, activeStep } = useSelector((state: RootState) => ({
    canvaData: selectCanvaData(state),
    activeStep: selectActiveStep(state),
  }));
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = () => {
    setOpenDialog(false);
    onClose?.();
  };

  const handleNext = async () => {
    dispatch(setActiveStep(activeStep + 1));
  };

  const handleSubmit = async () => {
    if (!canvaData.chapterId) return;
    setIsSubmitting(true);
    try {
      await apisCanvas.postCanva({ chapter_id: canvaData.chapterId, images: canvaData.files });
      setOpenDialog(false);
      await push(Route.chapter);
    } catch (e) {
      console.error(e);
    }
    setIsSubmitting(false);
  };

  return (
    <div>
      <Dialog open={openDialog} onClose={handleClose} maxWidth={false}>
        <DialogContent>
          {activeStep === 0 && <AddCanva context="canva" values={canvaData} onNext={handleNext} />}
          {activeStep === 1 && (
            <DataReview context="canva" values={canvaData} onNext={handleSubmit} isSubmitting={isSubmitting} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
