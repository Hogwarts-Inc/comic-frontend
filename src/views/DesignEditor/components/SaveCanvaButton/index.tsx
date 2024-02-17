import React, { useState } from 'react';

import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@components/Button';
import { DialogAddCanva } from '@components/DialogAddCanva';
import { Route } from 'src/constants/routes';
import useDesignEditorContext from 'src/hooks/useDesignEditorContext';
import { setActiveStep, setCanvaFiles } from 'src/store/slices/canva-creator/reducer';
import { selectCanvaData } from 'src/store/slices/canva-creator/selectors';

export const SaveCanvaButton = () => {
  const { t } = useTranslation();
  const { push } = useRouter();
  const { scenes } = useDesignEditorContext();
  const dispatch = useDispatch();
  const canvaData = useSelector(selectCanvaData);

  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const uploadCanva = async () => {
    setIsLoading(true);
    try {
      const images = scenes
        ?.map(({ history, scenePosition }) => history[scenePosition].preview)
        .filter(Boolean) as string[];

      if (images.length > 0 && canvaData) {
        dispatch(setCanvaFiles(images));
        if (canvaData.chapterId) {
          dispatch(setActiveStep(1));
          setIsDialogOpen(true);
        } else {
          dispatch(setActiveStep(2));
          push(Route.chapterCreate);
        }
      }
    } catch (e) {
      // TODO handle error
    }
    setIsLoading(false);
  };

  return (
    <>
      <Button onClick={uploadCanva} isLoading={isLoading}>
        {t('navbar.save')}
      </Button>
      {isDialogOpen && <DialogAddCanva openDialog={isDialogOpen} setOpenDialog={setIsDialogOpen} />}
    </>
  );
};
