import reducer, {
  addFavorite,
  removeFavorite,
  toggleFavorite,
  clearFavorites,
} from './favoritesSlice';

describe('favoritesSlice', () => {
  const initialState = {
    itemIds: [],
  };

  it('should handle initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle addFavorite', () => {
    const actual = reducer(initialState, addFavorite('item1'));
    expect(actual.itemIds).toEqual(['item1']);

    // Should not add duplicate
    const actual2 = reducer(actual, addFavorite('item1'));
    expect(actual2.itemIds).toEqual(['item1']);
  });

  it('should handle removeFavorite', () => {
    const state = { itemIds: ['item1', 'item2'] };
    const actual = reducer(state, removeFavorite('item1'));
    expect(actual.itemIds).toEqual(['item2']);
  });

  it('should handle toggleFavorite', () => {
    // Add if not present
    const actual = reducer(initialState, toggleFavorite('item1'));
    expect(actual.itemIds).toEqual(['item1']);

    // Remove if present
    const actual2 = reducer(actual, toggleFavorite('item1'));
    expect(actual2.itemIds).toEqual([]);
  });

  it('should handle clearFavorites', () => {
    const state = { itemIds: ['item1', 'item2'] };
    const actual = reducer(state, clearFavorites());
    expect(actual.itemIds).toEqual([]);
  });
});
