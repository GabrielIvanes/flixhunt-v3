import { MediaDetails, VideoItem } from '@/utils/global-interfaces';
import { Crew } from '@/utils/person-interfaces';
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

export function filterCrew(media: MediaDetails) {
  const filteredCrew: Crew[] = [];
  const ids: number[] = [];

  for (const crewMember of media.credits.crew) {
    if (!ids.includes(crewMember.id)) {
      ids.push(crewMember.id);
      filteredCrew.push(crewMember);
    } else {
      const crewMemberTmp = filteredCrew.find(
        (filteredCrewMember) => filteredCrewMember.id === crewMember.id
      );
      if (crewMemberTmp) {
        crewMemberTmp.job += `, ${crewMember.job}`;
      }
    }
  }
  return filteredCrew;
}
