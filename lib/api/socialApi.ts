import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { SocialPost, ApiResponse } from '../../types';

export const socialApi = createApi({
  reducerPath: 'socialApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/social' }),
  endpoints: (builder) => ({
    getPostsByHashtag: builder.query<ApiResponse<SocialPost[]>, string>({
      queryFn: async (hashtag) => {
        await new Promise((resolve) => setTimeout(resolve, 500));

        const mockData: SocialPost[] = [
          {
            id: '201',
            author: '@user1',
            content: `Loving this #mock data for #${hashtag}!`,
            hashtags: ['mock', hashtag],
            likes: 42,
            createdAt: new Date().toISOString(),
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
    searchContent: builder.query<ApiResponse<unknown[]>, string>({
      queryFn: async (query) => {
        await new Promise((resolve) => setTimeout(resolve, 700));

        if (!query.trim()) {
          return { data: { data: [], isEmpty: true } };
        }

        const mockResults = [
          { id: 's1', type: 'post', title: `Search result for: ${query}` },
        ];

        return {
          data: {
            data: mockResults,
            isEmpty: mockResults.length === 0,
          },
        };
      },
    }),
  }),
});

export const { useGetPostsByHashtagQuery, useSearchContentQuery } = socialApi;
