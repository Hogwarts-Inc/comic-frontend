import { RootState } from '../../rootReducer';

export const selectCanvaData = (state: RootState) => state.canvaCreator.canvaData;
export const selectActiveStep = (state: RootState) => state.canvaCreator.activeStep;
