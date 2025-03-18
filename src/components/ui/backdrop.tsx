'use client';

import { UseTmdb } from '@/context/tmdb-context';

interface Props {
  backdropPath: string;
}

export default function Backdrop({ backdropPath }: Props) {
  const secureBaseUrl = UseTmdb().images.secure_base_url;
  const url = `${secureBaseUrl}original${backdropPath}`;
  return (
    <div className="w-full h-screen absolute top-0 z-0 !bg-neutral-900">
      <div
        className="w-full h-screen bg-cover opacity-20"
        style={{
          backgroundImage: `url(${url})`,
        }}
      ></div>
    </div>
  );
}
