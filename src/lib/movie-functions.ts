import { ApiError } from 'next/dist/server/api-utils';
import { fetchData } from '../lib/global-functions';
import {
  MovieDetails,
  MoviesResult,
  MovieSummary,
} from '../utils/movie-interfaces';
import { Filters, Genre, Providers } from '@/utils/global-interfaces';

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

export async function getTopRatedMovies(
  filters: Filters,
  region: string,
  personsIn: boolean
) {
  const globalError = 'Failed to fetch top-rated movies.';

  try {
    const genres = filters.genres?.map((genre) => genre.id).join(',');
    const providers = filters.providers
      ?.map((provider) => provider.provider_id)
      .join('|');
    const keywords = filters.keywords?.map((keyword) => keyword.id).join(',');

    const cast = filters.persons
      ?.filter((person) => person.known_for_department === 'Acting')
      .map((person) => person.id)
      .join(personsIn ? ',' : '|');
    const crew = filters.persons
      ?.filter((person) => person.known_for_department !== 'Acting')
      .map((person) => person.id)
      .join(personsIn ? ',' : '|');
    const persons = filters.persons
      ?.map((person) => person.id)
      .join(personsIn ? ',' : '|');

    let url = `${process.env.BASE_URL}/api/tmdb/movies/top-rated?language=en-US&page=${filters.page}`;
    if (genres) url += `&genres=${genres}`;
    if (providers) url += `&providers=${providers}&region=${region}`;
    if (keywords) url += `&keywords=${keywords}`;
    if (cast && crew?.length === 0) url += `&cast=${cast}`;
    if (crew && cast?.length === 0) url += `&crew=${crew}`;
    if (cast && cast.length > 0 && crew && crew.length > 0 && persons)
      url += `&persons=${persons}`;
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

export async function getWatchProviders(region: string) {
  const globalError = 'Failed to fetch movie providers.';

  try {
    const url = `${process.env.BASE_URL}/api/tmdb/providers/movies?region=${region}&language=en-US`;
    const option = { next: { revalidate: 3600 } };
    const providers: Providers = await fetchData(url, globalError, option);
    return providers;
  } catch (err) {
    console.log(err);
    if (err instanceof ApiError) throw err;
    throw new Error(globalError);
  }
}
