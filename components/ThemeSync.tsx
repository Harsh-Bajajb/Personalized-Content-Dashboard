'use client';

import { useEffect } from 'react';
import { useAppSelector } from '../lib/hooks';

export default function ThemeSync() {
  const isDarkMode = useAppSelector((state) => state.preferences.darkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return null;
}
