import React from 'react';

import { DialogContentText } from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import Button from '@components/Button';
import { Route } from 'src/constants/routes';
import { resetChapterQueue } from 'src/store/slices/chapter-queue';

import { DialogActionsStyle, DialogContainer, DialogContentStyle, DialogStyle, DialogTitleStyle } from './styles';

interface DialogUserQueueParams {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  handleWait: () => void;
}

export const DialogUserQueue = ({ openDialog, setOpenDialog, handleWait }: DialogUserQueueParams) => {
  const { t } = useTranslation();
  const { push } = useRouter();
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(resetChapterQueue());
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
          <Button variantType="gradient" size="large" onClick={handleWait}>
            {t('dialogUserQueue.wait')}
          </Button>
          <Button variantType="gradient" size="large" onClick={() => push(Route.chapterCreate)} autoFocus>
            {t('dialogUserQueue.createChapter')}
          </Button>
        </DialogActionsStyle>
      </DialogContainer>
    </DialogStyle>
  );
};
