'use client';

import { TmdbConfiguration } from '@/utils/tmdb-config-interfaces';
import { createContext, useContext, ReactNode } from 'react';

const TmdbContext = createContext<TmdbConfiguration | null>(null);

interface tmdbProviderProps {
  value: TmdbConfiguration;
  children: ReactNode;
}

export function TmdbProvider({ value, children }: tmdbProviderProps) {
  return <TmdbContext.Provider value={value}>{children}</TmdbContext.Provider>;
}

export function UseTmdb() {
  const context = useContext(TmdbContext);
  if (!context) {
    throw new Error('useTmdb must be used inside tmdbProvider.');
  }
  return context;
}
