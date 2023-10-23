/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit';

import { setPublicDesigns } from './actions';
import { IDesign } from '../../../interfaces/DesignEditor';

export interface DesignsState {
  designs: IDesign[];
  public: IDesign[];
}

const initialState: DesignsState = {
  designs: [],
  public: [],
};

export const designsReducer = createReducer(initialState, builder => {
  builder.addCase(setPublicDesigns, (state, { payload }) => {
    state.public = payload;
  });
});
