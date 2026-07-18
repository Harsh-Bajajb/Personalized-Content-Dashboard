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
      className="touch-none"
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
