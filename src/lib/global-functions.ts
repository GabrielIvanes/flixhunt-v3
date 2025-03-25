import { MediaDetails, VideoItem } from '@/utils/global-interfaces';
import { MovieDetails } from '@/utils/movie-interfaces';
import {
  MediaCastCredit,
  CombinedCredits,
  Crew,
  MediaCrewCredit,
} from '@/utils/person-interfaces';
import {
  AggregateCrew,
  EpisodeDetails,
  SeasonDetails,
  TvShowDetails,
} from '@/utils/tv-show-interfaces';
import { ApiError } from 'next/dist/server/api-utils';

export async function fetchData(
  url: string,
  globalError: string,
  options = {}
) {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new ApiError(response.status, response.statusText);
    }

    const data = await response.json();
    return data.response;
  } catch (err) {
    console.log(err);
    if (err instanceof ApiError) throw err;
    throw new Error(globalError);
  }
}

export function convertTime(minutes: number) {
  if (minutes < 10) {
    return `0${minutes} min`;
  } else if (minutes < 60) {
    return `${minutes} min`;
  } else {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h${remainingMinutes}min`;
  }
}

export function getDirectors(media: MediaDetails) {
  return 'credits' in media
    ? media.credits.crew.filter((person) => person.job === 'Director')
    : media.created_by;
}

export function getTrailer(
  media: MediaDetails | SeasonDetails | EpisodeDetails
): VideoItem | null {
  let videosTrailer = media.videos.results.filter(
    (video) => video.type === 'Trailer' && video.site === 'YouTube'
  );
  if (videosTrailer.length === 0) return null;
  if (videosTrailer.length === 1) return videosTrailer[0];
  const firstTrailer = videosTrailer[0];

  videosTrailer = videosTrailer.filter((video) => video.official === true);
  if (videosTrailer.length === 0) return firstTrailer;
  if (videosTrailer.length === 1) return videosTrailer[0];
  const secondTrailer = videosTrailer[0];

  videosTrailer = videosTrailer.filter(
    (video) =>
      video.name === 'Trailer' ||
      video.name === 'Official Trailer' ||
      video.name === 'Main Trailer' ||
      video.name === 'Official US Trailer'
  );
  if (videosTrailer.length === 0) return secondTrailer;
  else return videosTrailer[0];
}

export function filterCrew(
  media: MovieDetails | CombinedCredits | SeasonDetails | EpisodeDetails
) {
  const filteredCrew = new Map<number, Crew | MediaCrewCredit>();

  const crew = 'credits' in media ? media.credits.crew : media.crew;

  for (const crewMember of crew) {
    if (filteredCrew.has(crewMember.id)) {
      filteredCrew.get(crewMember.id)!.job += `, ${crewMember.job}`;
    } else {
      filteredCrew.set(crewMember.id, { ...crewMember });
    }
  }
  return Array.from(filteredCrew.values());
}

export function filterAggregateCrew(media: TvShowDetails) {
  const filteredCrew = new Map<number, AggregateCrew>();

  for (const crewMember of media.aggregate_credits.crew) {
    if (filteredCrew.has(crewMember.id)) {
      const existingCrewMember = filteredCrew.get(crewMember.id)!;
      for (const job of crewMember.jobs) {
        if (!existingCrewMember.jobs.some((j) => j.job === job.job)) {
          existingCrewMember.jobs.push(job);
        }
      }
    } else {
      filteredCrew.set(crewMember.id, {
        ...crewMember,
        jobs: [...crewMember.jobs],
      });
    }
  }

  return Array.from(filteredCrew.values());
}

export function filterCastCredit(MediaCastCredit: MediaCastCredit[]) {
  const filteredCast = new Map<number, MediaCastCredit>();

  for (const cast of MediaCastCredit) {
    if (filteredCast.has(cast.id)) {
      filteredCast.get(cast.id)!.character += `, ${cast.character}`;
    } else {
      filteredCast.set(cast.id, { ...cast });
    }
  }

  return Array.from(filteredCast.values());
}

export function compareByPopularity(
  a: MediaCastCredit | MediaCrewCredit,
  b: MediaCastCredit | MediaCrewCredit,
  order: string
): number {
  const popularityScoreA: number = a.vote_average * a.vote_count;
  const popularityScoreB: number = b.vote_average * b.vote_count;

  if (order === 'descending') return popularityScoreB - popularityScoreA;
  else return popularityScoreA - popularityScoreB;
}
export function compareByDate(
  a: MediaCastCredit | MediaCrewCredit,
  b: MediaCastCredit | MediaCrewCredit,
  order: string
) {
  const dateA = new Date(
    ('release_date' in a ? a.release_date : a.first_air_date) ?? ''
  );
  const dateB = new Date(
    ('release_date' in b ? b.release_date : b.first_air_date) ?? ''
  );

  if (isNaN(dateA.getTime())) {
    return order === 'ascending' ? -1 : 1;
  }
  if (isNaN(dateB.getTime())) {
    return order === 'ascending' ? 1 : -1;
  }

  return order === 'ascending'
    ? dateA.getTime() - dateB.getTime()
    : dateB.getTime() - dateA.getTime();
}
