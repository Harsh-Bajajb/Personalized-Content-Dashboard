'use client';

import React from 'react';
import { Heart } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import { toggleFavorite } from '../features/favorites/favoritesSlice';

interface ContentCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  badgeText?: string;
}

export default function ContentCard({
  id,
  title,
  description,
  imageUrl,
  ctaText = 'Read More',
  onCtaClick,
  badgeText,
}: ContentCardProps) {
  const dispatch = useAppDispatch();
  const favoriteIds = useAppSelector((state) => state.favorites.itemIds);
  const isFavorite = favoriteIds.includes(id);

  const handleFavoriteClick = () => {
    dispatch(toggleFavorite(id));
  };

  return (
    <div className="flex flex-col bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      {imageUrl && (
        <div className="relative h-48 w-full bg-gray-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          {badgeText && (
            <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-sm">
              {badgeText}
            </span>
          )}
        </div>
      )}

      <div className="flex flex-col flex-grow p-5">
        {!imageUrl && badgeText && (
          <span className="self-start bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-md mb-2">
            {badgeText}
          </span>
        )}
        <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-2">
          {title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow">
          {description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
          <button
            onClick={onCtaClick}
            className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
          >
            {ctaText}
          </button>

          <button
            onClick={handleFavoriteClick}
            className={`p-2 rounded-full transition-colors ${
              isFavorite
                ? 'text-red-500 bg-red-50 hover:bg-red-100'
                : 'text-gray-400 hover:text-red-500 hover:bg-gray-50'
            }`}
            aria-label="Toggle Favorite"
          >
            <Heart size={20} className={isFavorite ? 'fill-current' : ''} />
          </button>
        </div>
      </div>
    </div>
  );
}
