import { createAction } from '@reduxjs/toolkit';

import { Page } from '../../../interfaces/common';

export const addPage = createAction<Page>('designEditor/addPage');
export const removePage = createAction<Partial<Page>>('designEditor/removePage');
