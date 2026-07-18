import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserPreferencesState {
  favoriteCategories: string[];
  darkMode: boolean;
  feedOrder: string[];
  trendingOrder: string[];
}

const initialState: UserPreferencesState = {
  favoriteCategories: [],
  darkMode: false,
  feedOrder: [],
  trendingOrder: [],
};

export const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
    addCategory: (state, action: PayloadAction<string>) => {
      if (!state.favoriteCategories.includes(action.payload)) {
        state.favoriteCategories.push(action.payload);
      }
    },
    removeCategory: (state, action: PayloadAction<string>) => {
      state.favoriteCategories = state.favoriteCategories.filter(
        (cat) => cat !== action.payload
      );
    },
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.favoriteCategories = action.payload;
    },
    setFeedOrder: (state, action: PayloadAction<string[]>) => {
      state.feedOrder = action.payload;
    },
    setTrendingOrder: (state, action: PayloadAction<string[]>) => {
      state.trendingOrder = action.payload;
    },
  },
});

export const {
  toggleDarkMode,
  setDarkMode,
  addCategory,
  removeCategory,
  setCategories,
  setFeedOrder,
  setTrendingOrder,
} = preferencesSlice.actions;

export default preferencesSlice.reducer;
