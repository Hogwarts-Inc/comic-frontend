import React, { useState } from 'react';

import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@components/Button';
import { DialogAddCanva } from '@components/DialogAddCanva';
import { Route } from 'src/constants/routes';
import useDesignEditorContext from 'src/hooks/useDesignEditorContext';
import { setActiveStep as setActiveStepCanva, setCanvaFiles } from 'src/store/slices/add-canva/actions';
import { selectCanvaData } from 'src/store/slices/add-canva/selectors';
import { setActiveStep as setActiveStepChapter, setChapterFiles } from 'src/store/slices/chapter-create/actions';
import { selectChapterData } from 'src/store/slices/chapter-create/selectors';

export const SaveCanvaButton = () => {
  const { t } = useTranslation();
  const { push } = useRouter();
  const { scenes } = useDesignEditorContext();
  const dispatch = useDispatch();
  const chapterData = useSelector(selectChapterData);
  const canvaData = useSelector(selectCanvaData);

  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const uploadCanva = async () => {
    setIsLoading(true);
    try {
      const images = scenes?.map(({ history, scenePosition }) => history[scenePosition].preview).filter(Boolean) as string[];

      if (images.length > 0) {
        if (chapterData && chapterData.title && chapterData.description) {
          dispatch(setChapterFiles(images));
          dispatch(setActiveStepChapter(2));
          push(Route.chapterCreate);
        } else if (canvaData) {
          dispatch(setCanvaFiles(images));
          dispatch(setActiveStepCanva(1));
          setIsDialogOpen(true);
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
      {isDialogOpen && (
        <DialogAddCanva chapterId={1} openDialog={isDialogOpen} setOpenDialog={setIsDialogOpen} />
      )}
    </>
  );
};
