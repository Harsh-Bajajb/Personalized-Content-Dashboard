import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import preferencesReducer from '../features/preferences/preferencesSlice';
import favoritesReducer from '../features/favorites/favoritesSlice';
import { loadState, saveState } from './localStorage';

const PREFERENCES_STATE_KEY = 'app_preferences_state';
const FAVORITES_STATE_KEY = 'app_favorites_state';

const preloadedPreferences = loadState(PREFERENCES_STATE_KEY);
const preloadedFavorites = loadState(FAVORITES_STATE_KEY);

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    preferences: preferencesReducer,
    favorites: favoritesReducer,
  },
  preloadedState: {
    ...(preloadedPreferences ? { preferences: preloadedPreferences } : {}),
    ...(preloadedFavorites ? { favorites: preloadedFavorites } : {}),
  },
});

store.subscribe(() => {
  const state = store.getState();
  saveState(PREFERENCES_STATE_KEY, state.preferences);
  saveState(FAVORITES_STATE_KEY, state.favorites);
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
