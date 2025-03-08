'use client';

import { UseTmdb } from '@/context/tmdb-context';
import Image from 'next/image';

interface Props {
  id: number;
  image: string;
  title: string;
  width: number;
}

export default function Element({ id, image, title, width }: Props) {
  const secureBaseUrl = UseTmdb().images.secure_base_url;
  return (
    <div
      className={`flex flex-col items-center`}
      style={{ width: `${width}px`, maxWidth: `${width}px` }}
    >
      <Image
        key={id}
        src={`${secureBaseUrl}original${image}`}
        alt={title}
        width={width}
        height={width * 1.5}
        style={{
          width: `${width}px`,
          height: `${width * 1.5}px`,
          borderRadius: 'var(--radius)',
        }}
      />
    </div>
  );
}
