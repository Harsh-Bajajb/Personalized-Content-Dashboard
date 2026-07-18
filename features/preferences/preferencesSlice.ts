import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserPreferencesState {
  favoriteCategories: string[];
  darkMode: boolean;
}

const initialState: UserPreferencesState = {
  favoriteCategories: [],
  darkMode: false,
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
  },
});

export const {
  toggleDarkMode,
  setDarkMode,
  addCategory,
  removeCategory,
  setCategories,
} = preferencesSlice.actions;

export default preferencesSlice.reducer;
