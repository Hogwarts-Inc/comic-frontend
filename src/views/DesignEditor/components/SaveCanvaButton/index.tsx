import React, { useState } from 'react';

import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import Button from '@components/Button';
import { Route } from 'src/constants/routes';
import useDesignEditorContext from 'src/hooks/useDesignEditorContext';
import { apisCanvas } from 'src/services/apiConfig';

export const SaveCanvaButton = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();
  const { scenes } = useDesignEditorContext();

  const uploadCanva = async () => {
    setIsLoading(true);
    try {
      const images = scenes?.map(({ history, scenePosition }) => history[scenePosition].preview).filter(Boolean) as string[];

      if (images.length > 0) {
        await apisCanvas.postCanva({ chapter_id: 1, images: images });
      }
    } catch (e) {
      // TODO handle error
    }
    push(Route.home);
    setIsLoading(false);
  };

  return (
    <Button onClick={uploadCanva} isLoading={isLoading}>
      {t('navbar.save')}
    </Button>
  );
};
