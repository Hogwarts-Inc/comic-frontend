/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit';

import { CanvaData } from 'src/interfaces/common';

import { setActiveStep, setCanvaFiles, resetAddCanva } from './actions';

interface AddCanvaState {
  canvaData: CanvaData;
  activeStep: number;
}

const initialState: AddCanvaState = {
  canvaData: {
    files: [],
  },
  activeStep: 0,
};

export const addCanvaReducer = createReducer(initialState, builder => {
  builder
    .addCase(setCanvaFiles, (state, action) => {
      state.canvaData.files = action.payload;
    })
    .addCase(setActiveStep, (state, action) => {
      state.activeStep = action.payload;
    })
    .addCase(resetAddCanva, () => initialState);
});
