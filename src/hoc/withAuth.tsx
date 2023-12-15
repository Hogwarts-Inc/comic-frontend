/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { Route } from 'src/constants/routes';
import { RootState } from 'src/store/rootReducer';
import { selectActiveStep } from 'src/store/slices/chapter-create/selectors';

const withAuth = (WrappedComponent: React.ComponentType, requireChapterData: boolean = false) => (props: any) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { token } = useSelector((state: RootState) => state.auth); //TODO - obtener token usando getServerSideProps?
  const chapterStep = useSelector(selectActiveStep);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    if (!token) {
      router.push(Route.unauthorizedError);
    } else if (requireChapterData && chapterStep !== 1) {
      router.push(Route.forbiddenError); //caso de que se venga al editor desde chapter create, agregar para add viñeta normal
    } else {
      setIsAuthChecked(true);
    }
  }, [chapterStep, token, router]);

  if (!isAuthChecked) {
    return <div>{t('common.loading')}.</div>;
  }

  return <WrappedComponent {...props} />;
};

export default withAuth;
