import { combineReducers } from '@reduxjs/toolkit';

import authReducer from './slices/auth/index';
import canvaCreatorReducer from './slices/canva-creator/reducer';
import chapterQueueReducer from './slices/chapter-queue/index';
import { designEditorReducer } from './slices/design-editor/reducer';
import { fontsReducer } from './slices/fonts/reducer';
import resources from './slices/resources/reducer';
import { uploadsReducer } from './slices/uploads/reducer';

const rootReducer = combineReducers({
  canvaCreator: canvaCreatorReducer,
  designEditor: designEditorReducer,
  fonts: fontsReducer,
  uploads: uploadsReducer,
  resources,
  auth: authReducer,
  chapterQueue: chapterQueueReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
