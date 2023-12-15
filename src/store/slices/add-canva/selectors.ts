import { RootState } from '../../rootReducer';

export const selectCanvaData = (state: RootState) => state.addCanva.canvaData;
export const selectActiveStep = (state: RootState) => state.addCanva.activeStep;
