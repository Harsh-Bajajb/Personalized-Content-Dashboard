'use client';

import React, { useState, useMemo } from 'react';
import { useGetNewsByCategoryQuery } from '../../lib/api/newsApi';
import { useGetRecommendationsQuery } from '../../lib/api/recommendationsApi';
import { useGetPostsByHashtagQuery } from '../../lib/api/socialApi';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { setFeedOrder } from '../../features/preferences/preferencesSlice';
import { motion } from 'framer-motion';

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';

import SortableCard from '../../components/SortableCard';

export default function DashboardFeed() {
  const [visibleCount, setVisibleCount] = useState(6);
  const dispatch = useAppDispatch();
  const customOrder = useAppSelector((state) => state.preferences.feedOrder);

  // Fetch from our mock APIs
  const { data: newsData, isLoading: newsLoading } =
    useGetNewsByCategoryQuery('technology');
  const { data: recData, isLoading: recLoading } = useGetRecommendationsQuery();
  const { data: socialData, isLoading: socialLoading } =
    useGetPostsByHashtagQuery('tech');

  const isLoading = newsLoading || recLoading || socialLoading;

  // Merge and format data for the feed
  const baseItems = useMemo(() => {
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

  // Apply custom ordering from Redux if it exists
  const orderedItems = useMemo(() => {
    if (!customOrder || customOrder.length === 0) return baseItems;

    const itemsMap = new Map(baseItems.map((i) => [i.id, i]));
    const result = [];

    // Add items in custom order
    for (const id of customOrder) {
      if (itemsMap.has(id)) {
        result.push(itemsMap.get(id)!);
        itemsMap.delete(id);
      }
    }

    // Append any new items not in custom order at the end
    result.push(...Array.from(itemsMap.values()));
    return result;
  }, [baseItems, customOrder]);

  const visibleItems = orderedItems.slice(0, visibleCount);
  const hasMore = visibleCount < orderedItems.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  // dnd-kit setup
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // 5px drag distance to activate, allows clicking CTA without dragging
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = orderedItems.findIndex((i) => i.id === active.id);
      const newIndex = orderedItems.findIndex((i) => i.id === over.id);

      // Create new array, arrayMove does this immutably
      const newArray = arrayMove(orderedItems, oldIndex, newIndex);

      // Extract IDs to save to Redux custom order
      const newOrderIds = newArray.map((i) => i.id);
      dispatch(setFeedOrder(newOrderIds));
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (orderedItems.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500 dark:text-gray-400">
        <h2 className="text-xl font-medium">No items found</h2>
        <p className="mt-2">Check back later for more updates.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Your Feed
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Discover the latest news, recommendations, and social buzz. Drag to
            reorder.
          </p>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <SortableContext
            items={visibleItems.map((i) => i.id)}
            strategy={rectSortingStrategy}
          >
            {visibleItems.map((item) => (
              <SortableCard key={item.id} id={item.id} item={item} />
            ))}
          </SortableContext>
        </div>
      </DndContext>

      {hasMore && (
        <div className="flex justify-center mt-8 pb-12">
          <button
            onClick={handleLoadMore}
            className="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-full font-medium shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
