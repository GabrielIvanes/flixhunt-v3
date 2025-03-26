'use client';

import Filters from '@/components/filters/filters';
import ShowFilters from '@/components/filters/show-filters';
import {
  getTopRatedTvShows,
  getTvShowGenres,
  getTvShowWatchProviders,
} from '@/lib/tv-show-functions';
import {
  Filters as FiltersInterface,
  Genre,
  Providers,
} from '@/utils/global-interfaces';
import { TvShowsResult } from '@/utils/tv-show-interfaces';
import { useEffect, useState } from 'react';
import Element from '@/components/elements/element';
import { H3 } from '@/components/ui/typography';
import Pagination from '@/components/pagination/pagination';
import { useSearchParams } from 'next/navigation';

export default function TvShow() {
  const searchParams = useSearchParams();
  const genre = searchParams.get('genre');

  const [filters, setFilters] = useState<FiltersInterface>({
    page: 1,
    genres: undefined,
    dateGte: undefined,
    dateLte: undefined,
    voteGte: 900,
    rateGte: undefined,
    rateLte: undefined,
    providers: undefined,
    keywords: undefined,
    persons: undefined,
  });
  const [tvShowsResult, setTvShowsResult] = useState<TvShowsResult | undefined>(
    undefined
  );
  const [genres, setGenres] = useState<Genre[]>([]);
  const [providers, setProviders] = useState<Providers>();

  const countryCode = 'US';

  useEffect(() => {
    const fetchTvShows = async () => {
      const data = await getTopRatedTvShows(filters, countryCode);
      setTvShowsResult(data);
      console.log(data);
    };
    console.log(filters);

    fetchTvShows();
  }, [filters]);

  useEffect(() => {
    const fetchGenres = async () => {
      const tvShowGenres = await getTvShowGenres();
      setGenres(tvShowGenres);

      if (genre) {
        const tvShowGenre = tvShowGenres.find((g) => g.id.toString() == genre);
        if (tvShowGenre)
          setFilters((prevFilters) => ({
            ...prevFilters,
            genres: [tvShowGenre],
          }));
      }
    };

    const fetchProviders = async () => {
      const providers = await getTvShowWatchProviders(countryCode);
      setProviders(providers);
    };

    fetchGenres();
    fetchProviders();
  }, []);

  return (
    tvShowsResult && (
      <div className="flex flex-col pl-5 pt-2 gap-2 min-h-[calc(100vh-4rem-2.5rem)] w-full max-w-full mt-5 z-10 pb-10">
        <Filters
          filters={filters}
          setFilters={setFilters}
          genres={genres}
          providers={providers}
          voteGte={900}
        />
        <div className="mb-5">
          <ShowFilters filters={filters} />
        </div>
        <div className="flex flex-wrap justify-center gap-10">
          {tvShowsResult.total_results > 0 ? (
            tvShowsResult.results.map((tvShow) => (
              <Element
                key={tvShow.id}
                id={tvShow.id}
                image={tvShow.poster_path}
                title={tvShow.name}
                width={250}
                height={250 * 1.5}
                type={'tv-shows'}
                writeText={true}
                text={`${tvShow.name} ${
                  tvShow.first_air_date &&
                  '(' + tvShow.first_air_date.slice(0, 4) + ')'
                }`}
              />
            ))
          ) : (
            <H3 text="We haven't found any films with these filters, so try removing some of them ..." />
          )}
        </div>
        {tvShowsResult.total_pages > 1 && (
          <Pagination
            filters={filters}
            setFilters={setFilters}
            totalPages={tvShowsResult.total_pages}
          />
        )}
      </div>
    )
  );
}
