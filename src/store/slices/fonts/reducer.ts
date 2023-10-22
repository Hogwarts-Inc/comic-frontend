/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createReducer } from '@reduxjs/toolkit';

import { queryFonts, setFonts } from './actions';
import { IFontFamily } from '../../../interfaces/editor';

export interface FontsState {
  fonts: IFontFamily[];
  result: IFontFamily[];
}

const initialState: FontsState = {
  fonts: [],
  result: [],
};

function fuzzySearch(items: IFontFamily[], query: string) {
  const search = query.split(' ');
  const ret = items.reduce((found, i) => {
    let matches = 0;
    search.forEach(s => {
      let props = 0;
      for (const prop in i) {
        // @ts-ignore
        if (i[prop].indexOf(s) > -1) {
          props++;
        }
      }
      if (props >= 1) {
        matches++;
      }
    });
    if (matches === search.length) {
      // console.log(i, found, 'was found');
      // @ts-ignore
      found.push(i);
    }
    return found;
  }, []);
  return ret;
}

export const fontsReducer = createReducer(initialState, builder => {
  builder.addCase(setFonts, (state, { payload }) => {
    state.fonts = payload;
  });

  builder.addCase(queryFonts, (state, { payload }) => {
    const { skip, query } = payload;
    if (query) {
      state.result = fuzzySearch(state.fonts, query);
    } else {
      state.result = state.fonts.slice(0, skip * 100);
    }
    // const data = fuzzySearch(state.fonts, "open")
    // console.log(data)
  });
});
