/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction } from '@reduxjs/toolkit';

import { Resource } from '../../../interfaces/editor';

export const setPixabayResources = createAction<Resource[]>('resources/setPixabayResources');
