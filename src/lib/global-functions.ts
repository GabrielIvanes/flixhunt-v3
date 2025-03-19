import {
  MediaDetails,
  MediaSummary,
  VideoItem,
} from '@/utils/global-interfaces';
import {
  CastCredit,
  CombinedCredits,
  Crew,
  CrewCredit,
} from '@/utils/person-interfaces';
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
  return media.credits.crew.filter((person) => person.job === 'Director');
}

export function getTrailer(media: MediaDetails): VideoItem | null {
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

export function filterCrew(media: MediaDetails | CombinedCredits) {
  const filteredCrew = new Map<number, Crew | CrewCredit>();

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

export function filterCastCredit(castCredit: CastCredit[]) {
  const filteredCast = new Map<number, CastCredit>();

  for (const cast of castCredit) {
    if (filteredCast.has(cast.id)) {
      filteredCast.get(cast.id)!.character += `, ${cast.character}`;
    } else {
      filteredCast.set(cast.id, { ...cast });
    }
  }

  return Array.from(filteredCast.values());
}

export function compareByPopularity(
  a: MediaSummary,
  b: MediaSummary,
  order: string
): number {
  const popularityScoreA: number = a.vote_average * a.vote_count;
  const popularityScoreB: number = b.vote_average * b.vote_count;

  if (order === 'descending') return popularityScoreB - popularityScoreA;
  else return popularityScoreA - popularityScoreB;
}
export function compareByDate(
  a: CastCredit | CrewCredit,
  b: CastCredit | CrewCredit,
  order: string
) {
  const dateA = new Date(a.release_date);
  const dateB = new Date(b.release_date);

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
