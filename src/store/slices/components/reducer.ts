import { createReducer } from '@reduxjs/toolkit';

import { setPublicComponents } from './actions';
import { IComponent } from '../../../interfaces/DesignEditor';

export interface ComponentsState {
  components: IComponent[];
  public: IComponent[];
}

const initialState: ComponentsState = {
  components: [],
  public: [],
};

export const componentsReducer = createReducer(initialState, builder => {
  builder.addCase(setPublicComponents, (state, { payload }) => {
    state.public = payload;
  });
});
