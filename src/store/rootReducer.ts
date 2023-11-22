import { combineReducers } from '@reduxjs/toolkit';

import authReducer from './slices/auth/index';
import { componentsReducer } from './slices/components/reducer';
import { designEditorReducer } from './slices/design-editor/reducer';
import { designsReducer } from './slices/designs/reducer';
import { fontsReducer } from './slices/fonts/reducer';
import resources from './slices/resources/reducer';
import { uploadsReducer } from './slices/uploads/reducer';

const rootReducer = combineReducers({
  designEditor: designEditorReducer,
  fonts: fontsReducer,
  uploads: uploadsReducer,
  resources,
  designs: designsReducer,
  components: componentsReducer,
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
