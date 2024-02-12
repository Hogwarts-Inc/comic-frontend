/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { Route } from 'src/constants/routes';
import { selectCanvaData } from 'src/store/slices/canva-creator/selectors';

const withCanvaData = (WrappedComponent: React.ComponentType) => (props: any) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [isDataChecked, setIsDataChecked] = useState(false);
  const canvaData = useSelector(selectCanvaData);

  useEffect(() => {
    if ((!!canvaData.description && !!canvaData.title) || !!canvaData.chapterId) {
      setIsDataChecked(true);
    } else {
      router.push(Route.forbiddenError);
    }
  }, [canvaData, router]);

  if (!isDataChecked) {
    return <div>{t('common.loading')}.</div>;
  }

  return <WrappedComponent {...props} />;
};

export default withCanvaData;
