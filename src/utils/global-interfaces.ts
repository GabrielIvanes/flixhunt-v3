import { MovieDetails, MovieSummary } from './movie-interfaces';
import {
  Cast,
  Crew,
  MediaCastCredit,
  MediaCrewCredit,
} from './person-interfaces';
import {
  AggregateCast,
  AggregateCrew,
  EpisodeDetails,
  EpisodeSeason,
  EpisodeSummary,
  SeasonDetails,
  SeasonSummary,
  TvShowDetails,
  TvShowSummary,
} from './tv-show-interfaces';

export type Element = Person | Media | MediaCredit | Season | Episode;

export type MediaCredit = MediaCastCredit | MediaCrewCredit;
export type Media = MediaSummary | MediaDetails;
export type MediaSummary = MovieSummary | TvShowSummary;
export type MediaDetails = MovieDetails | TvShowDetails;
export type Person = Crew | Cast | AggregateCrew | AggregateCast;
export type Movie = MovieSummary | MovieDetails;
export type TvShow = TvShowSummary | TvShowDetails;
export type Season = SeasonSummary | SeasonDetails;
export type Episode = EpisodeSummary | EpisodeSeason | EpisodeDetails;

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface VideoItem {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface Provider {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}
export interface WatchProvider {
  link: string;
  buy: Provider[];
  rent: Provider[];
  flatrate: Provider[];
}

export interface WatchProviders {
  results: {
    [locale: string]: WatchProvider;
  };
}

export interface ReleaseDate {
  certification: string;
  descriptors: string[];
  iso_639_1: string;
  note: string;
  release_date: string; // ISO 8601 date string
  type: number;
}

export interface CountryRelease {
  iso_3166_1: string; // Country code (e.g., "US", "GB")
  release_dates: ReleaseDate[];
}

export interface Release {
  id: number;
  results: CountryRelease[];
}
export interface Certification {
  certification: string;
  meaning: string;
  order: number;
}

export interface CountryCertifications {
  [countryCode: string]: Certification[];
}

export interface Filters {
  page: number;
  genres: Genre[] | undefined;
  dateGte: number | undefined;
  dateLte: number | undefined;
  voteGte: number | undefined;
  rateGte: number | undefined;
  rateLte: number | undefined;
  providers: Provider[] | undefined;
  keywords: Keyword[] | undefined;
  persons: PersonQuery[] | undefined;
}

interface DisplayPriorities {
  [countryCode: string]: number;
}

export interface Providers {
  results: {
    display_priorities: DisplayPriorities;
    logo_path: string;
    provider_id: number;
    provider_name: string;
    display_priority: number;
  }[];
}

export interface Keyword {
  id: number;
  name: string;
}
export interface KeywordsSearch {
  page: number;
  results: Keyword[];
  total_pages: number;
  total_results: number;
}

export interface PersonsSearch {
  page: number;
  results: PersonQuery[];
  total_pages: number;
  total_results: number;
}

export interface PersonQuery {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  known_for: MediaQuery[];
}

interface MediaQuery {
  backdrop_path: string;
  id: number;
  title: string;
  original_title: string;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string;
  media_type: 'movie' | 'tv';
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  first_air_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  origin_country: string[];
}
