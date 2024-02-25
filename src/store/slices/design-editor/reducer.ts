/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

import { addPage, removePage } from './actions';
import { Page } from '../../../interfaces/common';

interface DesignEditorState {
  pages: Page[];
}

const initialState: DesignEditorState = {
  pages: [
    {
      id: nanoid(),
      name: 'First page',
    },
  ],
};

export const designEditorReducer = createReducer(initialState, builder => {
  builder.addCase(addPage, (state, { payload }) => {
    state.pages = state.pages.concat(payload);
  });
  builder.addCase(removePage, () => {});
});
