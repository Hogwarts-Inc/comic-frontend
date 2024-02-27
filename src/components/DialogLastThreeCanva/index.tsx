import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import Button from '@components/Button';
import { handleRemoveFromQueue } from 'src/helpers/chaptersQueue';
import { CanvaChapter } from 'src/interfaces/common';
import { apisChapters } from 'src/services/api';

import {
  DialogActionsStyle,
  DialogContainer,
  DialogContentStyle,
  DialogContentTextStyle,
  DialogStyle,
  DialogTitleStyle,
  Thumbnail,
  ThumbnailContainer,
} from './styles';

interface DialogUserQueueParams {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  chapterId: number;
  setOpenDialogAddCanva: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DialogLastThreeCanva = ({
  openDialog,
  setOpenDialog,
  chapterId,
  setOpenDialogAddCanva,
}: DialogUserQueueParams) => {
  const { t } = useTranslation();
  const [threeCanvas, setThreeCanvas] = useState<CanvaChapter>();

  const handleClose = () => {
    handleRemoveFromQueue(chapterId);
    setOpenDialog(false);
  };

  const handleNext = () => {
    setOpenDialogAddCanva(true);
    setOpenDialog(false);
  };

  useEffect(() => {
    if (openDialog) {
      apisChapters.getThreeLastCanva(chapterId).then(({ data }) => {
        setThreeCanvas(data);
      });
    }
  }, [openDialog, chapterId]);

  return (
    <DialogStyle open={openDialog} onClose={handleClose}>
      <DialogContainer>
        <DialogTitleStyle>{t('dialogLastCanvas.title')}</DialogTitleStyle>
        <DialogContentTextStyle>{t('dialogLastCanvas.description')}</DialogContentTextStyle>
        <DialogContentStyle>
          <ThumbnailContainer>
            {threeCanvas?.canvas?.map((canva, index) => (
              <Thumbnail key={canva.image_url} src={canva.image_url} alt={`image-${index}`} />
            ))}
          </ThumbnailContainer>
        </DialogContentStyle>
        <DialogActionsStyle>
          <Button variantType="gradient" size="large" onClick={handleClose} autoFocus>
            {t('dialogLastCanvas.cancel')}
          </Button>
          <Button variantType="gradient" size="large" onClick={handleNext} autoFocus>
            {t('dialogLastCanvas.next')}
          </Button>
        </DialogActionsStyle>
      </DialogContainer>
    </DialogStyle>
  );
};
