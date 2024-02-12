/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ChapterData } from 'src/interfaces/common';

interface ChapterFormState {
  canvaData: ChapterData;
  activeStep: number;
}

const initialState: ChapterFormState = {
  canvaData: {
    title: '',
    description: '',
    files: [],
    chapterId: undefined,
  },
  activeStep: 0,
};

const canvaCreatorSlice = createSlice({
  name: 'canvaCreator',
  initialState,
  reducers: {
    setChapterTitle: (state, { payload }: PayloadAction<string>) => {
      state.canvaData.title = payload;
    },
    setChapterDescription: (state, { payload }: PayloadAction<string>) => {
      state.canvaData.description = payload;
    },
    setCanvaFiles: (state, { payload }: PayloadAction<string[]>) => {
      state.canvaData.files = payload;
    },
    setActiveStep: (state, { payload }: PayloadAction<number>) => {
      state.activeStep = payload;
    },
    resetCanvaCreate: () => initialState,
    setChapterId: (state, { payload }: PayloadAction<number>) => {
      state.canvaData.chapterId = payload;
    },
  },
});

export const { resetCanvaCreate, setActiveStep, setCanvaFiles, setChapterDescription, setChapterTitle, setChapterId } =
  canvaCreatorSlice.actions;

export default canvaCreatorSlice.reducer;
