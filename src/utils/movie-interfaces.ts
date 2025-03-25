import {
  Genre,
  ProductionCompany,
  ProductionCountry,
  SpokenLanguage,
  VideoItem,
  WatchProviders,
} from './global-interfaces';
import { Cast, Crew } from './person-interfaces';

export interface MovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: string;
  budget: number;
  credits: {
    cast: Cast[];
    crew: Crew[];
  };
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  recommendations: MoviesResult;
  release_date: string;
  release_dates: { results: CountryRelease[] };
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  videos: {
    results: VideoItem[];
  };
  vote_average: number;
  vote_count: number;
  'watch/providers': WatchProviders;
}

export interface MovieSummary {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface ReleaseDate {
  certification: string;
  descriptors: string[];
  iso_639_1: string;
  note: string;
  release_date: string;
  type: number;
}

export interface CountryRelease {
  iso_3166_1: string;
  release_dates: ReleaseDate[];
}

export interface MoviesResult {
  page: number;
  results: MovieSummary[];
  total_pages: number;
  total_results: number;
}
