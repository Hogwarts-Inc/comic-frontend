/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { Route } from 'src/constants/routes';
import { selectActiveStep as selectActiveStepCanva } from 'src/store/slices/add-canva/selectors';
import { selectActiveStep as selectActiveStepChapter } from 'src/store/slices/chapter-create/selectors';

const withCanvaData = (WrappedComponent: React.ComponentType) => (props: any) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [isDataChecked, setIsDataChecked] = useState(false);
  const chapterStep = useSelector(selectActiveStepChapter);
  const canvaStep = useSelector(selectActiveStepCanva);

  useEffect(() => {
    if (chapterStep === 1 || chapterStep === 2 || canvaStep === 0 || canvaStep === 1) {
      setIsDataChecked(true);
    } else {
      router.push(Route.forbiddenError);
    }
  }, [canvaStep, chapterStep, router]);

  if (!isDataChecked) {
    return <div>{t('common.loading')}.</div>;
  }

  return <WrappedComponent {...props} />;
};

export default withCanvaData;
