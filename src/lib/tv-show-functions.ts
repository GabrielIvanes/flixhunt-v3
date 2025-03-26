import { ApiError } from 'next/dist/server/api-utils';
import { fetchData } from './global-functions';
import {
  EpisodeDetails,
  SeasonDetails,
  TvShowDetails,
  TvShowsResult,
  TvShowSummary,
} from '@/utils/tv-show-interfaces';
import { Filters, Genre, Providers } from '@/utils/global-interfaces';

export async function getTvShow(tvShow: string) {
  const globalError = 'Failed to fetch tv-show details.';

  try {
    const url = `${process.env.BASE_URL}/api/tmdb/tv-shows/${tvShow}?language=en-US`;
    const option = { next: { revalidate: 3600 } };
    const tvShowDetails: TvShowDetails = await fetchData(
      url,
      globalError,
      option
    );
    return tvShowDetails;
  } catch (err) {
    console.log(err);
    if (err instanceof ApiError) throw err;
    throw new Error(globalError);
  }
}

export async function getPopularTvShows() {
  const globalError = 'Failed to fetch popular tv shows.';

  try {
    const url = `${process.env.BASE_URL}/api/tmdb/tv-shows/popular?language=en-US`;
    const option = { next: { revalidate: 3600 } };
    const popularTvShows: TvShowSummary[] = (
      await fetchData(url, globalError, option)
    ).results;
    return popularTvShows;
  } catch (err) {
    console.log(err);
    if (err instanceof ApiError) throw err;
    throw new Error(globalError);
  }
}

export async function getTrendingTvShows() {
  const globalError = 'Failed to fetch trending tv shows.';

  try {
    const url = `${process.env.BASE_URL}/api/tmdb/tv-shows/trending?language=en-US`;
    const option = { next: { revalidate: 3600 } };
    const trendingTvShows: TvShowSummary[] = (
      await fetchData(url, globalError, option)
    ).results;
    return trendingTvShows;
  } catch (err) {
    console.log(err);
    if (err instanceof ApiError) throw err;
    throw new Error(globalError);
  }
}

export function getTvShowDate(
  firstAirDate: string,
  lastAirDate: string,
  status: string
) {
  if (!firstAirDate) return null;
  if (!lastAirDate) return firstAirDate.slice(0, 4);

  if (
    (status.toLowerCase() === 'canceled' ||
      status.toLowerCase() === 'stopped' ||
      status.toLowerCase() === 'ended') &&
    firstAirDate.slice(0, 4) != lastAirDate.slice(0, 4)
  ) {
    return `${firstAirDate.slice(0, 4)} - ${lastAirDate.slice(0, 4)}`;
  } else {
    return firstAirDate.slice(0, 4);
  }
}

export async function getSeason(tvShowId: string, season: string) {
  const globalError = 'Failed to fetch season details.';

  try {
    const url = `${process.env.BASE_URL}/api/tmdb/tv-shows/${tvShowId}/seasons/${season}?language=en-US`;
    const option = { next: { revalidate: 3600 } };
    const seasonDetails: SeasonDetails = await fetchData(
      url,
      globalError,
      option
    );
    return seasonDetails;
  } catch (err) {
    console.log(err);
    if (err instanceof ApiError) throw err;
    throw new Error(globalError);
  }
}

export async function getEpisode(
  tvShowId: string,
  season: string,
  episode: string
) {
  const globalError = 'Failed to fetch season details.';

  try {
    const url = `${process.env.BASE_URL}/api/tmdb/tv-shows/${tvShowId}/seasons/${season}/episodes/${episode}?language=en-US`;
    const option = { next: { revalidate: 3600 } };
    const episodeDetails: EpisodeDetails = await fetchData(
      url,
      globalError,
      option
    );
    return episodeDetails;
  } catch (err) {
    console.log(err);
    if (err instanceof ApiError) throw err;
    throw new Error(globalError);
  }
}

export async function getTopRatedTvShows(filters: Filters, region: string) {
  const globalError = 'Failed to fetch top-rated movies.';

  try {
    const genres = filters.genres?.map((genre) => genre.id).join(',');
    const providers = filters.providers
      ?.map((provider) => provider.provider_id)
      .join('|');
    const keywords = filters.keywords?.map((keyword) => keyword.id).join(',');

    let url = `${process.env.BASE_URL}/api/tmdb/tv-shows/top-rated?language=en-US&page=${filters.page}`;
    if (genres) url += `&genres=${genres}`;
    if (providers) url += `&providers=${providers}&region=${region}`;
    if (keywords) url += `&keywords=${keywords}`;
    if (filters.dateGte) url += `&date-gte=${filters.dateGte}`;
    if (filters.dateLte) url += `&date-lte=${filters.dateLte}`;
    if (filters.voteGte) url += `&vote-gte=${filters.voteGte}`;
    if (filters.rateGte) url += `&rate-gte=${filters.rateGte}`;
    if (filters.rateLte) url += `&rate-lte=${filters.rateLte}`;

    const option = { next: { revalidate: 3600 } };
    const topRatedMovies: TvShowsResult = await fetchData(
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

export async function getTvShowWatchProviders(region: string) {
  const globalError = 'Failed to fetch tv-show providers.';

  try {
    const url = `${process.env.BASE_URL}/api/tmdb/providers/tv-shows?region=${region}&language=en-US`;
    const option = { next: { revalidate: 3600 } };
    const providers: Providers = await fetchData(url, globalError, option);
    return providers;
  } catch (err) {
    console.log(err);
    if (err instanceof ApiError) throw err;
    throw new Error(globalError);
  }
}

export async function getTvShowGenres() {
  const globalError = 'Failed to fetch tv-show genres.';

  try {
    const url = `${process.env.BASE_URL}/api/tmdb/genres/tv-shows?language=en-US`;
    const option = { next: { revalidate: 3600 * 24 } };
    const genres: Genre[] = (await fetchData(url, globalError, option)).genres;
    return genres;
  } catch (err) {
    console.log(err);
    if (err instanceof ApiError) throw err;
    throw new Error(globalError);
  }
}
