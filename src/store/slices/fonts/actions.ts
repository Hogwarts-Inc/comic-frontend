/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction } from '@reduxjs/toolkit';

interface QueryFont {
  take: number;
  skip: number;
  query: string;
}

export const queryFonts = createAction<QueryFont>('fonts/queryFonts');
