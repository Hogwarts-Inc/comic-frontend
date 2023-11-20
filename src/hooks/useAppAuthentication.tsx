/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { apisComic } from 'src/services/apiConfig';
import { RootState } from 'src/store/rootReducer';
import { setToken } from 'src/store/slices/auth';

export default function useAppAuthentication(accessToken: string) {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    if (token !== accessToken) {
      dispatch(setToken(accessToken));
      apisComic.getStoriettesById(1);
    }
  }, [token, accessToken, dispatch]);
}
