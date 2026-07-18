import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Recommendation, ApiResponse } from '../../types';

export const recommendationsApi = createApi({
  reducerPath: 'recommendationsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
  endpoints: (builder) => ({
    getRecommendations: builder.query<ApiResponse<Recommendation[]>, void>({
      queryFn: async () => {
        // Mock delay
        await new Promise((resolve) => setTimeout(resolve, 600));

        const mockData: Recommendation[] = [
          {
            id: '101',
            title: 'Mocked Movie 1',
            overview: 'This is a great mocked movie for recommendations.',
            voteAverage: 8.5,
            releaseDate: '2023-10-01',
          },
          {
            id: '102',
            title: 'Mocked Movie 2',
            overview: 'Another excellent mocked movie.',
            voteAverage: 7.2,
            releaseDate: '2024-01-15',
          },
        ];

        return {
          data: {
            data: mockData,
            isEmpty: mockData.length === 0,
          },
        };
      },
    }),
  }),
});

export const { useGetRecommendationsQuery } = recommendationsApi;
