import { RootState } from '../../rootReducer';

export const selectDesigns = (state: RootState) => state.designs.designs;
export const selectPublicDesigns = (state: RootState) => state.designs.public;
