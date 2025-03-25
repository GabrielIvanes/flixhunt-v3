export interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}
export interface Crew {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
  department: string;
  job: string;
}

export interface PersonDetails {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: string;
  gender: number;
  homepage: string;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
  combined_credits: CombinedCredits;
}

export interface CombinedCredits {
  cast: MediaCastCredit[];
  crew: MediaCrewCredit[];
}

// export interface MediaCastCredit extends MediaSummary {
//   character: string;
//   credit_id: string;
//   media_type: 'movie' | 'tv';
//   order: number;
//   video: boolean;
// }

// export interface MediaCrewCredit extends MediaSummary {
//   credit_id: string;
//   department: string;
//   job: string;
//   media_type: 'movie' | 'tv';
//   video: boolean;
// }

interface BaseCredit {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  credit_id: string;
  media_type: 'movie' | 'tv';
}

export interface MediaCastCredit extends BaseCredit {
  origin_country: string[];
  original_name: string;
  original_title: string;
  first_air_date: string;
  release_date: string;
  name: string;
  title: string;
  character: string;
  episode_count: number;
  video: boolean;
}

export interface MediaCrewCredit extends BaseCredit {
  department: string;
  job: string;
  origin_country: string[];
  original_name: string;
  original_title: string;
  first_air_date: string;
  release_date?: string;
  name: string;
  title: string;
  episode_count: number;
  video: boolean;
}
