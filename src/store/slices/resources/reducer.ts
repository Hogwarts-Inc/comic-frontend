import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Resource = { id: string; url: string };
export interface ResourceSliceState {
  characters: Resource[];
  images: Resource[];
  shapes: Resource[];
  text: Resource[];
}

const appDataInitialState: ResourceSliceState = {
  characters: [],
  images: [],
  shapes: [],
  text: [],
};

const resources = createSlice({
  name: 'resources',
  initialState: appDataInitialState,
  reducers: {
    setResources(state, { payload }: PayloadAction<ResourceSliceState>) {
      state.characters = payload.characters;
      state.images = payload.images;
      state.shapes = payload.shapes;
      state.text = payload.text;
    },
  },
});

export const { setResources } = resources.actions;

export default resources.reducer;
