import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import rootReducer from './rootReducer';

// Configure persistence with whitelist
const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['chapterCreate'],
  // whitelist: ['appData', 'auth'],
};

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
});

export const persistor = persistStore(store);

export const useAppDispatch = () => useDispatch<AppDispatch>();

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
