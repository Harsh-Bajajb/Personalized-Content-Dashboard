'use client';

import React, { useState, useMemo } from 'react';
import ContentCard from '../../components/ContentCard';
import { useGetNewsByCategoryQuery } from '../../lib/api/newsApi';
import { useGetRecommendationsQuery } from '../../lib/api/recommendationsApi';
import { useGetPostsByHashtagQuery } from '../../lib/api/socialApi';

export default function DashboardFeed() {
  const [visibleCount, setVisibleCount] = useState(6);

  // Fetch from our mock APIs
  const { data: newsData, isLoading: newsLoading } =
    useGetNewsByCategoryQuery('technology');
  const { data: recData, isLoading: recLoading } = useGetRecommendationsQuery();
  const { data: socialData, isLoading: socialLoading } =
    useGetPostsByHashtagQuery('tech');

  const isLoading = newsLoading || recLoading || socialLoading;

  // Merge and format data for the feed
  const feedItems = useMemo(() => {
    const items: {
      id: string;
      originalId: string;
      title: string;
      description: string;
      badgeText: string;
      imageUrl?: string;
      date: string;
    }[] = [];

    if (newsData?.data) {
      newsData.data.forEach((article) => {
        items.push({
          id: `news_${article.id}`,
          originalId: article.id,
          title: article.title,
          description: article.description,
          badgeText: 'News',
          imageUrl: article.imageUrl,
          date: article.publishedAt,
        });
      });
    }

    if (recData?.data) {
      recData.data.forEach((movie) => {
        items.push({
          id: `rec_${movie.id}`,
          originalId: movie.id,
          title: movie.title,
          description: movie.overview,
          badgeText: 'Recommendation',
          imageUrl: movie.posterPath,
          date: movie.releaseDate,
        });
      });
    }

    if (socialData?.data) {
      socialData.data.forEach((post) => {
        items.push({
          id: `social_${post.id}`,
          originalId: post.id,
          title: `Post by ${post.author}`,
          description: post.content,
          badgeText: 'Social',
          date: post.createdAt,
        });
      });
    }

    // Sort by date descending (mock)
    return items.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [newsData, recData, socialData]);

  const visibleItems = feedItems.slice(0, visibleCount);
  const hasMore = visibleCount < feedItems.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (feedItems.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        <h2 className="text-xl font-medium">No items found</h2>
        <p className="mt-2">Check back later for more updates.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Your Feed
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Discover the latest news, recommendations, and social buzz.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {visibleItems.map((item) => (
          <ContentCard
            key={item.id}
            id={item.originalId}
            title={item.title}
            description={item.description}
            imageUrl={item.imageUrl}
            badgeText={item.badgeText}
          />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-8 pb-12">
          <button
            onClick={handleLoadMore}
            className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-full font-medium shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
