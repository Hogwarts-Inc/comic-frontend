import { createAction } from '@reduxjs/toolkit';

export const setCanvaFiles = createAction<string[]>('canvaForm/setCanvaFiles');
export const resetAddCanva = createAction('canvaForm/resetAddCAnva');
export const setActiveStep = createAction<number>('canvaForm/setActiveStep');
