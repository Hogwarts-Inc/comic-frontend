import React, { useEffect } from 'react';

import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import { Route } from 'src/constants/routes';

const Reset = () => {
  const dispatch = useDispatch();
  const { push } = useRouter();
  useEffect(() => {
    dispatch({ type: 'RESET' });
    push(Route.home);
  }, [dispatch, push]);

  return <></>;
};

export default Reset;
