import React from 'react';

import { DialogContentText } from '@mui/material';
import { useTranslation } from 'react-i18next';

import Button from '@components/Button';

import { DialogActionsStyle, DialogContainer, DialogContentStyle, DialogStyle, DialogTitleStyle } from './styles';

interface DialogUserQueueParams {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DialogUserQueue = ({ openDialog, setOpenDialog }: DialogUserQueueParams) => {
  const { t } = useTranslation();

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <DialogStyle open={openDialog} onClose={handleClose}>
      <DialogContainer>
        <DialogTitleStyle>{t('dialogUserQueue.title')}</DialogTitleStyle>
        <DialogContentStyle>
          <DialogContentText>{t('dialogUserQueue.description')}</DialogContentText>
        </DialogContentStyle>
        <DialogActionsStyle>
          <Button variantType="gradient" size="large" onClick={handleClose}>
            {t('dialogUserQueue.cancel')}
          </Button>
          <Button variantType="gradient" size="large" onClick={handleClose} autoFocus>
            {t('dialogUserQueue.createChapter')}
          </Button>
        </DialogActionsStyle>
      </DialogContainer>
    </DialogStyle>
  );
};
