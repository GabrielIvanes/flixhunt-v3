import { ApiError } from 'next/dist/server/api-utils';
import { fetchData } from '../lib/global-functions';
import { MovieDetails, MovieSummary } from '../utils/movie-interfaces';
import { Genre } from '@/utils/global-interfaces';

export async function getTheatreMovies() {
  const globalError = 'Failed to fetch theatre movies.';

  try {
    const url = `${process.env.BASE_URL}/api/tmdb/movies/in-theatres?language=en-US`;
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
  const globalError = 'Failed to fetch theatre movies.';

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
