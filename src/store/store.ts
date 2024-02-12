/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import rootReducer from './rootReducer';

// Configure persistence with whitelist
const persistConfig = {
  key: 'root',
  storage,
};

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export const useAppDispatch = () => useDispatch<AppDispatch>();

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
