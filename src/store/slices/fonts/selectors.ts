import { RootState } from '../../rootReducer';

export const selectAllFonts = (state: RootState) => state.fonts.fonts;
export const selectFonts = (state: RootState) => state.fonts.result;
