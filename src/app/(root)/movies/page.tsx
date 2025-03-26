'use client';

import {
  getMovieGenres,
  getTopRatedMovies,
  getWatchProviders,
} from '@/lib/movie-functions';
import Element from '@/components/elements/element';
import { useEffect, useState } from 'react';

import { MoviesResult } from '@/utils/movie-interfaces';
import {
  Filters as FiltersInterface,
  Genre,
  Providers,
} from '@/utils/global-interfaces';
import { H3 } from '@/components/ui/typography';

import Pagination from '@/components/pagination/pagination';
import ShowFilters from '@/components/filters/show-filters';
import Filters from '@/components/filters/filters';

export default function Movie() {
  const [filters, setFilters] = useState<FiltersInterface>({
    page: 1,
    genres: undefined,
    dateGte: undefined,
    dateLte: undefined,
    voteGte: 8000,
    rateGte: undefined,
    rateLte: undefined,
    providers: undefined,
    keywords: undefined,
    persons: undefined,
  });
  const [moviesResult, setMoviesResult] = useState<MoviesResult | undefined>(
    undefined
  );
  const [genres, setGenres] = useState<Genre[]>([]);
  const [providers, setProviders] = useState<Providers>();
  const [personsIn, setPersonsIn] = useState<boolean>(false);

  const countryCode = 'US';

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getTopRatedMovies(filters, countryCode, personsIn);
      setMoviesResult(data);
      console.log(data);
    };
    console.log(filters);

    fetchMovies();
  }, [filters, personsIn]);

  useEffect(() => {
    const fetchGenres = async () => {
      const movieGenres = await getMovieGenres();
      setGenres(movieGenres);
    };

    const fetchProviders = async () => {
      const providers = await getWatchProviders(countryCode);
      setProviders(providers);
    };

    fetchGenres();
    fetchProviders();
  }, []);

  return (
    moviesResult && (
      <div className="flex flex-col pl-5 pt-2 gap-2 min-h-[calc(100vh-4rem-2.5rem)] w-full max-w-full mt-5 z-10 pb-10">
        <Filters
          filters={filters}
          setFilters={setFilters}
          genres={genres}
          providers={providers}
          personsIn={personsIn}
          setPersonsIn={setPersonsIn}
          voteGte={8000}
        />
        <div className="mb-5">
          <ShowFilters filters={filters} personsIn={personsIn} />
        </div>
        <div className="flex flex-wrap justify-center gap-10">
          {moviesResult.total_results > 0 ? (
            moviesResult.results.map((movie) => (
              <Element
                key={movie.id}
                id={movie.id}
                image={movie.poster_path}
                title={movie.title}
                width={250}
                height={250 * 1.5}
                type={'movies'}
                writeText={true}
                text={`${movie.title} ${
                  movie.release_date &&
                  '(' + movie.release_date.slice(0, 4) + ')'
                }`}
              />
            ))
          ) : (
            <H3 text="We haven't found any films with these filters, so try removing some of them ..." />
          )}
        </div>
        {moviesResult.total_pages > 1 && (
          <Pagination
            filters={filters}
            setFilters={setFilters}
            totalPages={moviesResult.total_pages}
          />
        )}
      </div>
    )
  );
}
