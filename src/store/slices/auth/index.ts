/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IAuth {
  token: string;
}

const initialState: IAuth = {
  token: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, { payload }: PayloadAction<string>) => {
      state.token = payload;
    },
  },
});

export const { setToken } = authSlice.actions;

export default authSlice.reducer;
