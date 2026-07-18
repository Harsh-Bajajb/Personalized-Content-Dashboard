import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FavoritesState {
  itemIds: string[];
}

const initialState: FavoritesState = {
  itemIds: [],
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<string>) => {
      if (!state.itemIds.includes(action.payload)) {
        state.itemIds.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.itemIds = state.itemIds.filter((id) => id !== action.payload);
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      if (state.itemIds.includes(action.payload)) {
        state.itemIds = state.itemIds.filter((id) => id !== action.payload);
      } else {
        state.itemIds.push(action.payload);
      }
    },
    clearFavorites: (state) => {
      state.itemIds = [];
    },
    setFavoritesOrder: (state, action: PayloadAction<string[]>) => {
      state.itemIds = action.payload;
    },
  },
});

export const {
  addFavorite,
  removeFavorite,
  toggleFavorite,
  clearFavorites,
  setFavoritesOrder,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
