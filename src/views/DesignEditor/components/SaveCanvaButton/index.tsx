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
      for (const { history, scenePosition } of scenes || []) {
        if (history[scenePosition].preview) {
          await apisCanvas.postCanva({ chapter_id: 1, image: history[scenePosition].preview as string });
        }
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
