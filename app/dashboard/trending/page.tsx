'use client';

import React from 'react';
import ContentCard from '../../../components/ContentCard';
import { useGetNewsByCategoryQuery } from '../../../lib/api/newsApi';

export default function TrendingPage() {
  // Using news API to mock trending items for now
  const { data, isLoading } = useGetNewsByCategoryQuery('trending');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (data?.isEmpty) {
    return (
      <div className="text-center py-20 text-gray-500">
        <h2 className="text-xl font-medium">No trending items right now</h2>
        <p className="mt-2">Check back later for the latest trends.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Trending Now
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Top stories and items across all categories.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {data?.data.map((item) => (
          <ContentCard
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            imageUrl={item.imageUrl}
            badgeText="Trending"
          />
        ))}
      </div>
    </div>
  );
}
