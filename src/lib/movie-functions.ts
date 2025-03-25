import { ApiError } from 'next/dist/server/api-utils';
import { fetchData } from '../lib/global-functions';
import {
  MovieDetails,
  MoviesResult,
  MovieSummary,
} from '../utils/movie-interfaces';
import { Filters, Genre } from '@/utils/global-interfaces';

export async function getTheatreMovies() {
  const globalError = 'Failed to fetch theatre movies.';

  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/tmdb/movies/in-theatres?language=en-US`;
    const option = { next: { revalidate: 3600 * 24 } };
    const theatresMovies: MovieSummary[] = (
      await fetchData(url, globalError, option)
    ).results;
    return theatresMovies;
  } catch (err) {
    console.log(err);
    if (err instanceof ApiError) throw err;
    throw new Error(globalError);
  }
}

export async function getPopularMovies() {
  const globalError = 'Failed to fetch popular movies.';

  try {
    const url = `${process.env.BASE_URL}/api/tmdb/movies/popular?language=en-US`;
    const option = { next: { revalidate: 3600 } };
    const popularMovies: MovieSummary[] = (
      await fetchData(url, globalError, option)
    ).results;
    return popularMovies;
  } catch (err) {
    console.log(err);
    if (err instanceof ApiError) throw err;
    throw new Error(globalError);
  }
}

export async function getTrendingMovies() {
  const globalError = 'Failed to fetch trending movies.';

  try {
    const url = `${process.env.BASE_URL}/api/tmdb/movies/trending?language=en-US`;
    const option = { next: { revalidate: 3600 } };
    const trendingMovies: MovieSummary[] = (
      await fetchData(url, globalError, option)
    ).results;
    return trendingMovies;
  } catch (err) {
    console.log(err);
    if (err instanceof ApiError) throw err;
    throw new Error(globalError);
  }
}

export async function getTopRatedMovies(filters: Filters) {
  const globalError = 'Failed to fetch top-rated movies.';

  try {
    const genres = filters.genres?.map((genre) => genre.id).join(',');

    let url = `${process.env.BASE_URL}/api/tmdb/movies/top-rated?language=en-US&page=${filters.page}`;
    if (genres) url += `&genres=${genres}`;
    if (filters.dateGte) url += `&date-gte=${filters.dateGte}`;
    if (filters.dateLte) url += `&date-lte=${filters.dateLte}`;
    if (filters.voteGte) url += `&vote-gte=${filters.voteGte}`;
    if (filters.rateGte) url += `&rate-gte=${filters.rateGte}`;
    if (filters.rateLte) url += `&rate-lte=${filters.rateLte}`;

    const option = { next: { revalidate: 3600 } };
    const topRatedMovies: MoviesResult = await fetchData(
      url,
      globalError,
      option
    );
    return topRatedMovies;
  } catch (err) {
    console.log(err);
    if (err instanceof ApiError) throw err;
    throw new Error(globalError);
  }
}

export async function getMovieGenres() {
  const globalError = 'Failed to fetch movie genres.';

  try {
    const url = `${process.env.BASE_URL}/api/tmdb/genres/movies?language=en-US`;
    const option = { next: { revalidate: 3600 * 24 } };
    const genres: Genre[] = (await fetchData(url, globalError, option)).genres;
    return genres;
  } catch (err) {
    console.log(err);
    if (err instanceof ApiError) throw err;
    throw new Error(globalError);
  }
}

export async function getMoviesByGenre(genre: Genre) {
  const globalError = 'Failed to fetch movies.';

  try {
    const url = `${process.env.BASE_URL}/api/tmdb/movies/discover?with-genres=${genre.id}&language=en-US`;
    const option = { next: { revalidate: 3600 * 24 } };
    const movies: MovieSummary[] = (await fetchData(url, globalError, option))
      .results;
    return movies;
  } catch (err) {
    console.log(err);
    if (err instanceof ApiError) throw err;
    throw new Error(globalError);
  }
}

export async function getMovie(movie: string) {
  const globalError = 'Failed to fetch movie details.';

  try {
    const url = `${process.env.BASE_URL}/api/tmdb/movies/${movie}?language=en-US`;
    const option = { next: { revalidate: 3600 } };
    const movieDetails: MovieDetails = await fetchData(
      url,
      globalError,
      option
    );
    return movieDetails;
  } catch (err) {
    console.log(err);
    if (err instanceof ApiError) throw err;
    throw new Error(globalError);
  }
}

// export function addGenreFilter(filters: Filters, genre: Genre) {
//   const id = genre.id.toString();
//   let genres = filters.genres?.split(',').filter((genre) => genre != '') || [];

//   console.log(genres);

//   if (!genres.includes(id)) genres.push(id);
//   else genres = genres.filter((genre) => genre != id);

//   console.log(genres);

//   filters.genres = genres.join(',');

//   return filters;
// }
