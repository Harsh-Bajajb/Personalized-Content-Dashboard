'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import ContentCard from './ContentCard';

interface SortableCardProps {
  id: string;
  item: {
    originalId: string;
    title: string;
    description: string;
    badgeText?: string;
    imageUrl?: string;
  };
}

export default function SortableCard({ id, item }: SortableCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      aria-label={`Drag handle for ${item.title}`}
      className="touch-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl"
    >
      <ContentCard
        id={item.originalId}
        title={item.title}
        description={item.description}
        imageUrl={item.imageUrl}
        badgeText={item.badgeText}
      />
    </div>
  );
}
