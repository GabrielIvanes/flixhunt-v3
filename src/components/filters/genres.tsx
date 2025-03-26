import { Filters, Genre } from '@/utils/global-interfaces';
import React from 'react';
import { H3 } from '../ui/typography';
import { Button } from '../ui/button';

interface Props {
  genres: Genre[];
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

export default function GenresFilters({ genres, filters, setFilters }: Props) {
  return (
    <>
      <H3 text="Genres" classname="mb-4" />
      <div className="flex flex-wrap gap-x-2 gap-y-1 mt-2">
        {genres.map((genre) =>
          filters.genres && filters.genres.some((g) => g.id === genre.id) ? (
            <Button
              variant={'default'}
              key={genre.id}
              onClick={() =>
                setFilters((prevFilters) => ({
                  ...prevFilters,
                  genres:
                    prevFilters.genres && prevFilters.genres.length > 1
                      ? prevFilters.genres.filter((g) => g.id !== genre.id)
                      : undefined,
                }))
              }
            >
              {genre.name}
            </Button>
          ) : (
            <Button
              variant={'ghost'}
              key={genre.id}
              onClick={() =>
                setFilters((prevFilters) => ({
                  ...prevFilters,
                  genres: prevFilters.genres
                    ? [...prevFilters.genres, genre]
                    : [genre],
                }))
              }
            >
              {genre.name}
            </Button>
          )
        )}
      </div>
    </>
  );
}
