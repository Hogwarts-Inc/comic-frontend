/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { RootState } from 'src/store/rootReducer';

const withAuth = (WrappedComponent: React.ComponentType) => (props: any) => {
  const router = useRouter();
  const { token } = useSelector((state: RootState) => state.auth);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    if (!token) {
      router.push('/_error?statusCode=401');
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
