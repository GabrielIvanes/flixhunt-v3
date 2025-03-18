'use client';

import Image, { ImageProps } from 'next/image';
import { UseTmdb } from '@/context/tmdb-context';
import { CSSProperties, useState } from 'react';
import { Skeleton } from './skeleton';

interface TmdbImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  image: string;
  title: string;
  className?: string;
  width?: number;
  height?: number;
  style?: CSSProperties;
  priority?: boolean;
}

export default function TmdbImage({
  image,
  title,
  className = '',
  width,
  height,
  style,
  priority = false,
}: TmdbImageProps) {
  const baseUrl = UseTmdb().images.secure_base_url || UseTmdb().images.base_url;
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div style={{ position: 'relative', width, height }}>
      {!isLoaded && (
        <Skeleton
          style={{
            width: `${width}px`,
            height: `${height}px`,
            borderRadius: 'var(--radius)',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        />
      )}
      <Image
        src={`${baseUrl}original${image}`}
        alt={title}
        className={className}
        width={width}
        height={height}
        style={{
          ...style,
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
        }}
        priority={priority}
        onLoadingComplete={() => setIsLoaded(true)}
      />
    </div>
  );
}
