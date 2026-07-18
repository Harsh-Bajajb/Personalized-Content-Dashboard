import reducer, {
  toggleDarkMode,
  setDarkMode,
  addCategory,
  removeCategory,
  setCategories,
  setFeedOrder,
} from './preferencesSlice';

describe('preferencesSlice', () => {
  const initialState = {
    favoriteCategories: [],
    darkMode: false,
    feedOrder: [],
  };

  it('should handle initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle toggleDarkMode', () => {
    const actual = reducer(initialState, toggleDarkMode());
    expect(actual.darkMode).toEqual(true);
    
    const actual2 = reducer(actual, toggleDarkMode());
    expect(actual2.darkMode).toEqual(false);
  });

  it('should handle setDarkMode', () => {
    const actual = reducer(initialState, setDarkMode(true));
    expect(actual.darkMode).toEqual(true);
  });

  it('should handle addCategory', () => {
    const actual = reducer(initialState, addCategory('tech'));
    expect(actual.favoriteCategories).toEqual(['tech']);

    // Should not add duplicates
    const actual2 = reducer(actual, addCategory('tech'));
    expect(actual2.favoriteCategories).toEqual(['tech']);
  });

  it('should handle removeCategory', () => {
    const state = { ...initialState, favoriteCategories: ['tech', 'sports'] };
    const actual = reducer(state, removeCategory('tech'));
    expect(actual.favoriteCategories).toEqual(['sports']);
  });

  it('should handle setCategories', () => {
    const actual = reducer(initialState, setCategories(['tech', 'music']));
    expect(actual.favoriteCategories).toEqual(['tech', 'music']);
  });

  it('should handle setFeedOrder', () => {
    const actual = reducer(initialState, setFeedOrder(['id1', 'id2']));
    expect(actual.feedOrder).toEqual(['id1', 'id2']);
  });
});
