'use client';

import React, { useMemo, useState } from 'react';
import { useGetNewsByCategoryQuery } from '../../../lib/api/newsApi';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import { setTrendingOrder } from '../../../features/preferences/preferencesSlice';
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
import { motion } from 'framer-motion';

import SortableCard from '../../../components/SortableCard';

export default function TrendingPage() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const customOrder = useAppSelector(
    (state) => state.preferences.trendingOrder
  );
  const { data, isLoading } = useGetNewsByCategoryQuery('trending');

  // Format data
  const baseItems = useMemo(() => {
    if (!data?.data) return [];
    return data.data.map((item) => ({
      id: `trending_${item.id}`,
      originalId: item.id,
      title: item.title,
      description: item.description,
      imageUrl: item.imageUrl,
      badgeText: 'Trending',
    }));
  }, [data]);

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
      const oldIndex = orderedItems.findIndex((i) => i.id === active.id);
      const newIndex = orderedItems.findIndex((i) => i.id === over.id);

      const newArray = arrayMove(orderedItems, oldIndex, newIndex);
      const newOrderIds = newArray.map((i) => i.id);
      dispatch(setTrendingOrder(newOrderIds));
    }
  };

  const handleDragCancel = () => {
    setActiveId(null);
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
        <h2 className="text-xl font-medium">No trending items right now</h2>
        <p className="mt-2">Check back later for the latest trends.</p>
      </div>
    );
  }

  return (
    <section aria-label="Trending" className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          Trending Now
        </h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Top stories and items across all categories. Drag to reorder.
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
            items={orderedItems.map((i) => i.id)}
            strategy={rectSortingStrategy}
          >
            {orderedItems.map((item) => (
              <SortableCard key={item.id} id={item.id} item={item} />
            ))}
          </SortableContext>
        </div>

        <DragOverlay>
          {activeId
            ? (() => {
                const activeItem = orderedItems.find((i) => i.id === activeId);
                if (!activeItem) return null;
                return (
                  <ContentCard
                    id={activeItem.originalId}
                    title={activeItem.title}
                    description={activeItem.description}
                    imageUrl={activeItem.imageUrl}
                    badgeText={activeItem.badgeText}
                  />
                );
              })()
            : null}
        </DragOverlay>
      </DndContext>
    </section>
  );
}
