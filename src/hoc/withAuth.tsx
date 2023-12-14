/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { RootState } from 'src/store/rootReducer';
import { selectActiveStep } from 'src/store/slices/chapter-create/selectors';

const withAuth = (WrappedComponent: React.ComponentType, requireChapterData: boolean = false) => (props: any) => {
  const router = useRouter();
  const { token } = useSelector((state: RootState) => state.auth);
  const chapterStep = useSelector(selectActiveStep);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    if (!token) {
      router.push('/_error?statusCode=401');
    } else if (requireChapterData && chapterStep !== 1) {
      router.push('/_error?statusCode=403'); //caso de que se venga al editor desde chapter create, agregar para add viñeta normal
    } else {
      setIsAuthChecked(true);
    }
  }, [token, router]);

  if (!isAuthChecked) {
    return <div>Loading...</div>;
  }

  return <WrappedComponent {...props} />;
};

export default withAuth;
