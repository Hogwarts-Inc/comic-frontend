import { RootState } from '../../rootReducer';

export const selectChapterData = (state: RootState) => state.chapterCreate.chapterData;
export const selectActiveStep = (state: RootState) => state.chapterCreate.activeStep;
