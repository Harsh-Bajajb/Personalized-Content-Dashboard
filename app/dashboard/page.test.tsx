import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import DashboardFeed from './page';

// Mock dependencies
jest.mock('../../lib/api/newsApi', () => ({
  useGetNewsByCategoryQuery: jest.fn(),
}));
jest.mock('../../lib/api/recommendationsApi', () => ({
  useGetRecommendationsQuery: jest.fn(),
}));
jest.mock('../../lib/api/socialApi', () => ({
  useGetPostsByHashtagQuery: jest.fn(),
}));

import { useGetNewsByCategoryQuery } from '../../lib/api/newsApi';
import { useGetRecommendationsQuery } from '../../lib/api/recommendationsApi';
import { useGetPostsByHashtagQuery } from '../../lib/api/socialApi';

// Mock store
const renderWithStore = (component: React.ReactElement) => {
  const store = configureStore({
    reducer: {
      preferences: (state = { feedOrder: [] }) => state,
      favorites: (state = { itemIds: [] }) => state,
    },
  });
  return render(<Provider store={store}>{component}</Provider>);
};

describe('DashboardFeed', () => {
  it('renders loading state', () => {
    (useGetNewsByCategoryQuery as jest.Mock).mockReturnValue({
      isLoading: true,
    });
    (useGetRecommendationsQuery as jest.Mock).mockReturnValue({
      isLoading: true,
    });
    (useGetPostsByHashtagQuery as jest.Mock).mockReturnValue({
      isLoading: true,
    });

    const { container } = renderWithStore(<DashboardFeed />);

    // We expect the framer motion spinner div (the one with rounded-full border-blue-600)
    // We can just check if there's a div with the expected classes or test-id
    const spinner = container.querySelector('.rounded-full.border-blue-600');
    expect(spinner).toBeTruthy();
  });

  it('renders empty state when no items found', () => {
    (useGetNewsByCategoryQuery as jest.Mock).mockReturnValue({
      data: { data: [], isEmpty: true },
      isLoading: false,
    });
    (useGetRecommendationsQuery as jest.Mock).mockReturnValue({
      data: { data: [], isEmpty: true },
      isLoading: false,
    });
    (useGetPostsByHashtagQuery as jest.Mock).mockReturnValue({
      data: { data: [], isEmpty: true },
      isLoading: false,
    });

    renderWithStore(<DashboardFeed />);

    expect(screen.getByText('No items found')).toBeTruthy();
    expect(screen.getByText('Check back later for more updates.')).toBeTruthy();
  });

  it('renders content when data is fetched successfully', () => {
    (useGetNewsByCategoryQuery as jest.Mock).mockReturnValue({
      data: {
        data: [
          {
            id: 'news1',
            title: 'News 1',
            description: 'desc',
            publishedAt: '2023-10-01',
          },
        ],
      },
      isLoading: false,
    });
    (useGetRecommendationsQuery as jest.Mock).mockReturnValue({
      data: {
        data: [
          {
            id: 'rec1',
            title: 'Rec 1',
            overview: 'desc',
            releaseDate: '2023-10-02',
          },
        ],
      },
      isLoading: false,
    });
    (useGetPostsByHashtagQuery as jest.Mock).mockReturnValue({
      data: {
        data: [
          {
            id: 'soc1',
            author: 'Author 1',
            content: 'content',
            createdAt: '2023-10-03',
          },
        ],
      },
      isLoading: false,
    });

    renderWithStore(<DashboardFeed />);

    expect(screen.getByText('News 1')).toBeTruthy();
    expect(screen.getByText('Rec 1')).toBeTruthy();
    expect(screen.getByText('Post by Author 1')).toBeTruthy();
  });
});
