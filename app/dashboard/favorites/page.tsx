'use client';

import React from 'react';
import ContentCard from '../../../components/ContentCard';
import { useAppSelector } from '../../../lib/hooks';

export default function FavoritesPage() {
  const favoriteIds = useAppSelector((state) => state.favorites.itemIds);

  // In a real app, you would fetch the full items by these IDs using an API endpoint
  // e.g., useGetItemsByIdsQuery(favoriteIds).
  // For this mock, we will generate placeholder data based on the IDs.
  const favoriteItems = favoriteIds.map((id) => ({
    id,
    title: `Favorited Item (${id})`,
    description:
      'This is a mocked item generated from your saved favorites list.',
    badgeText: 'Saved',
  }));

  if (favoriteItems.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        <h2 className="text-xl font-medium">No favorites yet</h2>
        <p className="mt-2">Items you favorite will appear here.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Your Favorites
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          All your saved items in one place.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {favoriteItems.map((item) => (
          <ContentCard
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            badgeText={item.badgeText}
          />
        ))}
      </div>
    </div>
  );
}
