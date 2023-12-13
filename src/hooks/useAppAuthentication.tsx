import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { apiUserProfile } from 'src/services/apiConfig';
import { RootState } from 'src/store/rootReducer';
import { setId, setSub, setToken } from 'src/store/slices/auth';

export default function useAppAuthentication(accessToken: string) {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    if (token !== accessToken) {
      dispatch(setToken(accessToken));
      apiUserProfile
        .postUserProfile()
        .then(response => {
          dispatch(setId(response.data.id));
          dispatch(setSub(response.data.sub));
        })
        .catch(error => {
          console.error(error); // TODO handle error with alert
        });
    }
  }, [token, accessToken, dispatch]);
}
