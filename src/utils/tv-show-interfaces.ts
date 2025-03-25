import {
  Genre,
  ProductionCompany,
  ProductionCountry,
  SpokenLanguage,
  VideoItem,
  WatchProviders,
} from './global-interfaces';
import { Cast, Crew } from './person-interfaces';

export interface TvShowSummary {
  adult: boolean;
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export interface TvShowDetails {
  adult: boolean;
  aggregate_credits: {
    cast: AggregateCast[];
    crew: AggregateCrew[];
  };
  backdrop_path: string;
  content_ratings: { results: ContentRating[] };
  created_by: Creator[];
  episode_run_time: number[];
  first_air_date: string;
  genres: Genre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: EpisodeSummary;
  name: string;
  next_episode_to_air: EpisodeSummary;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  seasons: SeasonSummary[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
  recommendations: {
    page: number;
    results: TvShowSummary[];
    total_pages: number;
    total_results: number;
  };
  videos: {
    results: VideoItem[];
  };
  'watch/providers': WatchProviders;
}

export interface AggregateCast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string;
  roles: { credit_id: number; character: string; episode_count: number }[];
  total_episode_count: number;
}

export interface AggregateCrew {
  adult: boolean;
  department: string;
  gender: number;
  id: number;
  jobs: { credit_id: number; job: string; episode_count: number }[];
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  total_episode_count: number;
}

interface Creator {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
}

interface Network {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface EpisodeSummary {
  air_date: string;
  episode_number: number;
  episode_type: string;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
  crew: Crew[];
  guest_stars: Cast[];
}

export interface SeasonSummary {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

interface ContentRating {
  descriptors: string[];
  iso_3166_1: string;
  rating: string;
}

export interface SeasonDetails {
  air_date: string;
  credits: {
    cast: Cast[];
    crew: Crew[];
  };
  episodes: EpisodeSeason[];
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  videos: {
    results: VideoItem[];
  };
  vote_average: number;
  'watch/providers': WatchProviders;
}

export interface EpisodeSeason {
  air_date: string;
  episode_number: number;
  episode_type: string;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
  crew: Crew[];
  guest_stars: Cast[];
}

export interface EpisodeDetails {
  air_date: string;
  crew: Crew[];
  episode_number: number;
  guest_stars: Cast[];
  name: string;
  overview: string;
  id: number;
  production_code: string;
  runtime: number;
  season_number: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
  credits: {
    cast: Cast[];
    crew: Crew[];
  };
  videos: {
    results: VideoItem[];
  };
}
