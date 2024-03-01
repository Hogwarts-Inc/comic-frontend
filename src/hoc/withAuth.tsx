/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { Route } from 'src/constants/routes';
import { RootState } from 'src/store/rootReducer';

const withAuth = (WrappedComponent: any) => (props: any) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { token } = useSelector((state: RootState) => state.auth);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    if (!token) {
      router.push(Route.unauthorizedError);
    } else {
      setIsAuthChecked(true);
    }
  }, [token, router]);

  if (!isAuthChecked) {
    return <div>{t('common.loading')}.</div>;
  }

  return <WrappedComponent {...props} />;
};

export default withAuth;
