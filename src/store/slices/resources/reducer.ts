/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Resource = { id: string; url: string };
export type Description = { id: string; title: string; text: string };
export type Character = { id: string; name: string; images: Resource[]; descriptions: Description[] };
export interface ResourceSliceState {
  characters: Character[];
  background: Resource[];
  shapes: Resource[];
  dialog: Resource[];
  [key: string]: Character[] | Resource[];
}

const resourcesInitialState: ResourceSliceState = {
  characters: [],
  background: [],
  shapes: [],
  dialog: [],
};

const resources = createSlice({
  name: 'resources',
  initialState: resourcesInitialState,
  reducers: {
    setResources(
      state,
      { payload }: PayloadAction<{ background: Resource[]; shapes: Resource[]; dialog: Resource[] }>,
    ) {
      state.background = payload.background;
      state.shapes = payload.shapes;
      state.dialog = payload.dialog;
    },
    setCharacters(state, { payload }: PayloadAction<Character[]>) {
      state.characters = payload;
    },
  },
});

export const { setResources, setCharacters } = resources.actions;

export default resources.reducer;
