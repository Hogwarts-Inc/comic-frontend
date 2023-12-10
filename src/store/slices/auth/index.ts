/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IAuth {
  id: number;
  token: string;
  sub: string;
}

const initialState: IAuth = {
  id: 0,
  token: '',
  sub: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setId: (state, { payload }: PayloadAction<number>) => {
      state.id = payload;
    },
    setToken: (state, { payload }: PayloadAction<string>) => {
      state.token = payload;
    },
    setSub: (state, { payload }: PayloadAction<string>) => {
      state.sub = payload;
    },
  },
});

export const { setId, setToken, setSub } = authSlice.actions;

export default authSlice.reducer;
