'use client';

import React from 'react';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import { toggleFavorite } from '../features/favorites/favoritesSlice';

import { motion } from 'framer-motion';

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
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
    >
      {imageUrl && (
        <div className="relative h-48 w-full bg-gray-200 dark:bg-gray-700">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
            className="object-cover"
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
          <span className="self-start bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-semibold px-2 py-1 rounded-md mb-2">
            {badgeText}
          </span>
        )}
        <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 mb-2">
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-4 flex-grow">
          {description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50 dark:border-gray-700">
          <button
            onClick={onCtaClick}
            className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md px-2 py-1 -ml-2"
          >
            {ctaText}
          </button>

          <button
            onClick={handleFavoriteClick}
            onPointerDown={(e) => e.stopPropagation()} // Prevent drag conflict
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleFavoriteClick();
              }
            }}
            className={`p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isFavorite
                ? 'text-red-500 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20'
                : 'text-gray-400 hover:text-red-500 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart size={20} className={isFavorite ? 'fill-current' : ''} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
