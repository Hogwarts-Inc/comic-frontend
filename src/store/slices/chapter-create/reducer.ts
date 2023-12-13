/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit';

import { ChapterData } from 'src/interfaces/common';

import { resetChapterCreate, setActiveStep, setChapterDescription, setChapterFiles, setChapterTitle } from './actions';

interface ChapterFormState {
  chapterData: ChapterData;
  activeStep: number;
}

const initialState: ChapterFormState = {
  chapterData: {
    title: '',
    description: '',
    files: [],
  },
  activeStep: 0,
};

export const createChapterReducer = createReducer(initialState, builder => {
  builder
    .addCase(setChapterTitle, (state, action) => {
      state.chapterData.title = action.payload;
    })
    .addCase(setChapterDescription, (state, action) => {
      state.chapterData.description = action.payload;
    })
    .addCase(setChapterFiles, (state, action) => {
      state.chapterData.files = action.payload;
    })
    .addCase(setActiveStep, (state, action) => {
      state.activeStep = action.payload;
    })
    .addCase(resetChapterCreate, () => initialState);
});
