import React, { useState } from 'react';

import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@components/Button';
import { Route } from 'src/constants/routes';
import useDesignEditorContext from 'src/hooks/useDesignEditorContext';
import { apisCanvas } from 'src/services/apiConfig';
import { RootState } from 'src/store/rootReducer';
import { setActiveStep, setChapterFiles } from 'src/store/slices/chapter-create/actions';
import { selectChapterData } from 'src/store/slices/chapter-create/selectors';

export const SaveCanvaButton = () => {
  const { t } = useTranslation();
  const { push } = useRouter();
  const { scenes } = useDesignEditorContext();
  const dispatch = useDispatch();
  const chapterData = useSelector(selectChapterData);
  const { id } = useSelector((state: RootState) => state.auth);

  const [isLoading, setIsLoading] = useState(false);

  const uploadCanva = async () => {
    setIsLoading(true);
    try {
      const images = scenes?.map(({ history, scenePosition }) => history[scenePosition].preview).filter(Boolean) as string[];

      if (images.length > 0) {
        if (chapterData && chapterData.title && chapterData.description) {
          dispatch(setChapterFiles(images));
          dispatch(setActiveStep(2));
          push(`${Route.chapterCreate}`);
        } else {
          await apisCanvas.postCanva({ chapter_id: 1, images: images, user_profile_id: id });
          push(Route.home);
        }
      }
    } catch (e) {
      // TODO handle error
    }
    setIsLoading(false);
  };

  return (
    <Button onClick={uploadCanva} isLoading={isLoading}>
      {t('navbar.save')}
    </Button>
  );
};
