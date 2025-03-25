'use client';

import { getMovieGenres, getTopRatedMovies } from '@/lib/movie-functions';
import Element from '@/components/elements/element';
import { useEffect, useState } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { getYear } from 'date-fns';

import { Button } from '@/components/ui/button';

import { MoviesResult } from '@/utils/movie-interfaces';
import { Filters, Genre } from '@/utils/global-interfaces';
import { IoFilterSharp } from 'react-icons/io5';
import { H3, H4, P } from '@/components/ui/typography';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RxCross2 } from 'react-icons/rx';
import { Badge } from '@/components/ui/badge';

export default function Movie() {
  const [filters, setFilters] = useState<Filters>({
    page: 1,
    genres: undefined,
    dateGte: undefined,
    dateLte: undefined,
    voteGte: 8000,
    rateGte: undefined,
    rateLte: undefined,
  });
  const [moviesResult, setMoviesResult] = useState<MoviesResult | null>(null);
  const [genres, setGenres] = useState<Genre[]>([]);

  const years = Array.from(
    { length: getYear(new Date()) - 1895 + 1 },
    (_, i) => 1895 + i
  );

  const ratings = Array.from({ length: 10 }, (_, i) => i + 1);
  const counts = Array.from({ length: 200 }, (_, i) => (i + 1) * 50);

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getTopRatedMovies(filters);
      setMoviesResult(data);
      console.log(data);
    };
    console.log(filters);

    fetchMovies();
  }, [filters]);

  useEffect(() => {
    const fetchGenres = async () => {
      const movieGenres = await getMovieGenres();
      setGenres(movieGenres);
    };

    fetchGenres();
  }, []);

  return (
    moviesResult && (
      <div className="flex flex-col pl-5 pt-2 gap-2 min-h-[calc(100vh-4rem-2.5rem)] w-full max-w-full mt-5 z-10 pb-10">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-fit" variant={'ghost'}>
              Filters <IoFilterSharp />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[500px] overflow-y-auto min-w-[650px] w-fit max-w-[90%]">
            <DialogHeader>
              <DialogTitle>Filters</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col">
              <H3 text="Genres" classname="mb-4" />
              <div className="flex flex-wrap gap-x-2 gap-y-1 mt-2">
                {genres.map((genre) =>
                  filters.genres &&
                  filters.genres.some((g) => g.id === genre.id) ? (
                    <Button
                      variant={'default'}
                      key={genre.id}
                      onClick={() =>
                        setFilters((prevFilters) => ({
                          ...prevFilters,
                          genres:
                            prevFilters.genres && prevFilters.genres.length > 1
                              ? prevFilters.genres.filter(
                                  (g) => g.id !== genre.id
                                )
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
              <H3 text="Date" classname="mt-5 mb-4" />
              <div className="flex gap-5 mt-2">
                <div className="flex flex-col gap-1">
                  <P text="From" />
                  <Select
                    key={filters.dateGte}
                    value={filters.dateGte?.toString()}
                    onValueChange={(value) =>
                      setFilters((prevFilters) => ({
                        ...prevFilters,
                        dateGte:
                          value === 'reset' ? undefined : parseInt(value),
                        dateLte:
                          prevFilters.dateLte &&
                          value !== 'reset' &&
                          parseInt(value) > prevFilters.dateLte
                            ? undefined
                            : prevFilters.dateLte,
                      }))
                    }
                  >
                    <SelectTrigger className="w-[110px]">
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        value="reset"
                        className="text-muted-foreground"
                      >
                        Year
                      </SelectItem>
                      {years.map((year) =>
                        filters.dateLte ? (
                          year < filters.dateLte && (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          )
                        ) : (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-1">
                  <P text="To" />
                  <Select
                    key={filters.dateLte}
                    value={filters.dateLte?.toString()}
                    onValueChange={(value) =>
                      setFilters((prevFilters) => ({
                        ...prevFilters,
                        dateLte:
                          value === 'reset' ? undefined : parseInt(value),
                        dateGte:
                          prevFilters.dateGte &&
                          value != 'reset' &&
                          parseInt(value) < prevFilters.dateGte
                            ? undefined
                            : prevFilters.dateGte,
                      }))
                    }
                  >
                    <SelectTrigger className="w-[110px]">
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        value="reset"
                        className="text-muted-foreground"
                      >
                        Year
                      </SelectItem>
                      {years.map((year) =>
                        filters.dateGte ? (
                          year > filters.dateGte && (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          )
                        ) : (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <H3 text="User vote and rate" classname="mt-5 mb-4" />
              <div className="flex gap-10">
                <div className="flex flex-col gap-2">
                  <H4 text="Vote average" />
                  <div className="flex gap-5">
                    <div className="flex flex-col">
                      <span>Min</span>
                      <Select
                        key={filters.rateGte}
                        value={
                          filters.rateGte === 0
                            ? '0'
                            : filters.rateGte?.toString()
                        }
                        onValueChange={(value) =>
                          setFilters((prevFilters) => ({
                            ...prevFilters,
                            rateGte:
                              value === 'reset' ? undefined : parseInt(value),
                            rateLte:
                              prevFilters.rateLte &&
                              parseInt(value) > prevFilters.rateLte
                                ? undefined
                                : prevFilters.rateLte,
                          }))
                        }
                      >
                        <SelectTrigger className="w-[110px]">
                          <SelectValue placeholder="Rate" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem
                            value="reset"
                            className="text-muted-foreground"
                          >
                            Rate
                          </SelectItem>
                          {ratings.map((rating) =>
                            filters.rateLte ? (
                              rating < filters.rateLte && (
                                <SelectItem
                                  key={rating}
                                  value={rating.toString()}
                                >
                                  {rating}
                                </SelectItem>
                              )
                            ) : (
                              <SelectItem
                                key={rating}
                                value={rating.toString()}
                              >
                                {rating}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex flex-col">
                      <span>Max</span>
                      <Select
                        key={filters.rateLte}
                        value={filters.rateLte?.toString()}
                        onValueChange={(value) =>
                          setFilters((prevFilters) => ({
                            ...prevFilters,
                            rateLte:
                              value === 'reset' ? undefined : parseInt(value),
                            rateGte:
                              prevFilters.rateGte &&
                              parseInt(value) < prevFilters.rateGte
                                ? undefined
                                : prevFilters.rateGte,
                          }))
                        }
                      >
                        <SelectTrigger className="w-[110px]">
                          <SelectValue placeholder="Rate" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem
                            value="reset"
                            className="text-muted-foreground"
                          >
                            Rate
                          </SelectItem>
                          {ratings.map((rating) =>
                            filters.rateGte ? (
                              rating > filters.rateGte && (
                                <SelectItem
                                  key={rating}
                                  value={rating.toString()}
                                >
                                  {rating}
                                </SelectItem>
                              )
                            ) : (
                              <SelectItem
                                key={rating}
                                value={rating.toString()}
                              >
                                {rating}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <H4 text="Vote count" />
                  <div className="flex flex-col">
                    <span>Min</span>
                    <Select
                      key={filters.voteGte}
                      value={filters.voteGte?.toString()}
                      onValueChange={(value) =>
                        setFilters((prevFilters) => ({
                          ...prevFilters,
                          voteGte:
                            value === 'reset' ? undefined : parseInt(value),
                        }))
                      }
                    >
                      <SelectTrigger className="w-[110px]">
                        <SelectValue placeholder="Count" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          value="reset"
                          className="text-muted-foreground"
                        >
                          Count
                        </SelectItem>
                        {counts.map((count) => (
                          <SelectItem key={count} value={count.toString()}>
                            {count}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Button
                onClick={() =>
                  setFilters((prevFilters) => ({
                    ...prevFilters,
                    page: 1,
                    genres: undefined,
                    dateGte: undefined,
                    dateLte: undefined,
                    voteGte: 8000,
                    voteLte: undefined,
                    rateGte: undefined,
                    rateLte: undefined,
                  }))
                }
                variant="destructive"
                className="flex items-center mt-5"
              >
                <div>Clear all</div>
                <RxCross2 />
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        <div className="mb-5">
          {filters.genres && (
            <Badge key="genres" className="mr-2">
              Genres: {filters.genres.map((genre) => genre.name).join(', ')}
            </Badge>
          )}
          {filters.dateGte && (
            <Badge key="dateGte" className="mr-2">
              From: {filters.dateGte}
            </Badge>
          )}
          {filters.dateLte && (
            <Badge key="dateLte" className="mr-2">
              To: {filters.dateLte}
            </Badge>
          )}
          {filters.voteGte && (
            <Badge key="voteGte" className="mr-2">
              Min Vote: {filters.voteGte}
            </Badge>
          )}
          {filters.rateGte && (
            <Badge key="rateGte" className="mr-2">
              Min Rate: {filters.rateGte}
            </Badge>
          )}
          {filters.rateLte && (
            <Badge key="voteLte" className="mr-2">
              Max Rate: {filters.rateLte}
            </Badge>
          )}
        </div>
        <div className="flex flex-wrap justify-center gap-10">
          {moviesResult.results.map((movie) => (
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
                movie.release_date && '(' + movie.release_date.slice(0, 4) + ')'
              }`}
            />
          ))}
        </div>
        <Pagination>
          <PaginationContent>
            {filters.page > 1 && (
              <>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => {
                      setFilters((prevFilters) => ({
                        ...prevFilters,
                        page: prevFilters.page - 1,
                      }));
                      window.scrollTo(0, 0);
                    }}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    onClick={() => {
                      setFilters((prevFilters) => ({
                        ...prevFilters,
                        page: 1,
                      }));
                      window.scrollTo(0, 0);
                    }}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                {filters.page > 3 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                {filters.page > 2 && (
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => {
                        setFilters((prevFilters) => ({
                          ...prevFilters,
                          page: prevFilters.page - 1,
                        }));
                        window.scrollTo(0, 0);
                      }}
                    >
                      {filters.page - 1}
                    </PaginationLink>
                  </PaginationItem>
                )}
              </>
            )}
            <PaginationItem>
              <PaginationLink isActive>{filters.page}</PaginationLink>
            </PaginationItem>
            {filters.page < moviesResult.total_pages && (
              <>
                {filters.page + 1 < moviesResult.total_pages && (
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => {
                        setFilters((prevFilters) => ({
                          ...prevFilters,
                          page: prevFilters.page + 1,
                        }));
                        window.scrollTo(0, 0);
                      }}
                    >
                      {filters.page + 1}
                    </PaginationLink>
                  </PaginationItem>
                )}
                {filters.page + 2 < moviesResult.total_pages && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                <PaginationItem>
                  <PaginationLink
                    onClick={() => {
                      setFilters((prevFilters) => ({
                        ...prevFilters,
                        page: moviesResult.total_pages,
                      }));
                      window.scrollTo(0, 0);
                    }}
                  >
                    {moviesResult.total_pages}
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    onClick={() => {
                      setFilters((prevFilters) => ({
                        ...prevFilters,
                        page: prevFilters.page + 1,
                      }));
                      window.scrollTo(0, 0);
                    }}
                  />
                </PaginationItem>
              </>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    )
  );
}
