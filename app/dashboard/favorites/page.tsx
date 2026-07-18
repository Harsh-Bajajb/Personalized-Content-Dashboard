'use client';

import React, { useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import { setFavoritesOrder } from '../../../features/favorites/favoritesSlice';
import ContentCard from '../../../components/ContentCard';

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';

import SortableCard from '../../../components/SortableCard';

export default function FavoritesPage() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const favoriteIds = useAppSelector((state) => state.favorites.itemIds);

  // In a real app, you would fetch the full items by these IDs using an API endpoint
  // For this mock, we will generate placeholder data based on the IDs.
  const favoriteItems = useMemo(() => {
    return favoriteIds.map((id) => ({
      id,
      originalId: id,
      title: `Favorited Item (${id})`,
      description:
        'This is a mocked item generated from your saved favorites list.',
      badgeText: 'Saved',
    }));
  }, [favoriteIds]);

  // dnd-kit setup
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = favoriteItems.findIndex((i) => i.id === active.id);
      const newIndex = favoriteItems.findIndex((i) => i.id === over.id);

      const newArray = arrayMove(favoriteItems, oldIndex, newIndex);
      const newOrderIds = newArray.map((i) => i.id);
      dispatch(setFavoritesOrder(newOrderIds));
    }
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  if (favoriteItems.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500 dark:text-gray-400">
        <h2 className="text-xl font-medium">No favorites yet</h2>
        <p className="mt-2">Items you favorite will appear here.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          Your Favorites
        </h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          All your saved items in one place. Drag to reorder.
        </p>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <SortableContext
            items={favoriteItems.map((i) => i.id)}
            strategy={rectSortingStrategy}
          >
            {favoriteItems.map((item) => (
              <SortableCard key={item.id} id={item.id} item={item} />
            ))}
          </SortableContext>
        </div>

        <DragOverlay>
          {activeId
            ? (() => {
                const activeItem = favoriteItems.find((i) => i.id === activeId);
                if (!activeItem) return null;
                return (
                  <ContentCard
                    id={activeItem.originalId}
                    title={activeItem.title}
                    description={activeItem.description}
                    badgeText={activeItem.badgeText}
                  />
                );
              })()
            : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
