/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction } from '@reduxjs/toolkit';

import { IUpload, Uploading } from '../../../interfaces/editor';

export const setUploads = createAction<IUpload[]>('uploads/setUploads');
export const setUploading = createAction<Uploading>('uploads/setUploading');
export const closeUploading = createAction('uploads/closeUploading');
