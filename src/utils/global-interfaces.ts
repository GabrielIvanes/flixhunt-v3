import { MovieDetails, MovieSummary } from './movie-interfaces';
import { Cast, Crew } from './person-interfaces';

export type Element = MovieDetails | MovieSummary | Crew | Cast;
export type Media = MovieDetails | MovieSummary;
export type MediaSummary = MovieSummary;
export type MediaDetails = MovieDetails;
export type Person = Crew | Cast;

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
