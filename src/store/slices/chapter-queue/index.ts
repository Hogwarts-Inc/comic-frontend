/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IQueue {
  chapterId: number;
  position: number;
  isWaiting: boolean;
  isCreating: boolean;
}

const initialState: IQueue = {
  chapterId: -1,
  position: -1,
  isWaiting: false,
  isCreating: false,
};

const chapterQueueSlice = createSlice({
  name: 'chapterQueueSlice',
  initialState,
  reducers: {
    setChapterQueue: (state, { payload }: PayloadAction<IQueue>) => {
      state.position = payload.position;
      state.chapterId = payload.chapterId;
      state.isWaiting = payload.isWaiting;
      state.isCreating = payload.isCreating;
    },
    resetChapterQueue: () => initialState,
  },
});

export const { setChapterQueue, resetChapterQueue } = chapterQueueSlice.actions;

export default chapterQueueSlice.reducer;
