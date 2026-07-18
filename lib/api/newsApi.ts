import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { NewsArticle, ApiResponse } from '../../types';

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://newsapi.org/v2/' }), // Placeholder URL
  endpoints: (builder) => ({
    getNewsByCategory: builder.query<ApiResponse<NewsArticle[]>, string>({
      // We use queryFn to mock the response for now
      queryFn: async (category) => {
        // Mock delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        const mockData: NewsArticle[] = [
          {
            id: '1',
            title: `Breaking News in ${category}`,
            description: `This is a mocked news article for the ${category} category.`,
            url: 'https://example.com/news/1',
            category: category,
            publishedAt: new Date().toISOString(),
          },
          {
            id: '2',
            title: `More updates on ${category}`,
            description: `Another mock article for ${category}.`,
            url: 'https://example.com/news/2',
            category: category,
            publishedAt: new Date().toISOString(),
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

export const { useGetNewsByCategoryQuery } = newsApi;
