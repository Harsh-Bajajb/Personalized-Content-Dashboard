import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ContentCard from './ContentCard';
import favoritesReducer from '../features/favorites/favoritesSlice';

// Helper to render with a Redux store
const renderWithStore = (component: React.ReactElement, preloadedState?: any) => {
  const store = configureStore({
    reducer: {
      favorites: favoritesReducer,
      // Provide dummy reducers for other slices if needed by ContentCard 
      // (Currently it only uses favorites)
    },
    preloadedState,
  });
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

describe('ContentCard', () => {
  const mockProps = {
    id: 'test-id',
    title: 'Test Title',
    description: 'Test Description',
    imageUrl: 'http://test.image.com/img.jpg',
    badgeText: 'Test Badge',
  };

  it('renders correctly with all props', () => {
    renderWithStore(<ContentCard {...mockProps} />);

    expect(screen.getByText('Test Title')).toBeTruthy();
    expect(screen.getByText('Test Description')).toBeTruthy();
    expect(screen.getByText('Test Badge')).toBeTruthy();
    
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', mockProps.imageUrl);
  });

  it('toggles favorite on click', () => {
    const { store } = renderWithStore(<ContentCard {...mockProps} />, {
      favorites: { itemIds: [] },
    });

    const favButton = screen.getByLabelText('Toggle Favorite');
    
    // Initially not favorited
    expect(store.getState().favorites.itemIds).not.toContain('test-id');

    // Click to favorite
    fireEvent.click(favButton);
    expect(store.getState().favorites.itemIds).toContain('test-id');

    // Click to unfavorite
    fireEvent.click(favButton);
    expect(store.getState().favorites.itemIds).not.toContain('test-id');
  });
});
