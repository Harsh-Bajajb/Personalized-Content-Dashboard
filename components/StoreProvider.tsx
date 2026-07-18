'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { store } from '../lib/store';
import ThemeSync from './ThemeSync';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef(store);

  return (
    <Provider store={storeRef.current}>
      <ThemeSync />
      {children}
    </Provider>
  );
}
