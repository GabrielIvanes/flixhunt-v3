import {
  MediaCastCredit,
  MediaCrewCredit,
  PersonDetails,
} from '@/utils/person-interfaces';
import {
  compareByDate,
  compareByPopularity,
  fetchData,
} from './global-functions';
import { ApiError } from 'next/dist/server/api-utils';

export async function getPerson(person: string) {
  const globalError = 'Failed to fetch person details.';

  try {
    const url = `${process.env.BASE_URL}/api/tmdb/persons/${person}?language=en-US`;
    const option = { next: { revalidate: 3600 } };
    const personDetails: PersonDetails = await fetchData(
      url,
      globalError,
      option
    );
    return personDetails;
  } catch (err) {
    console.log(err);
    if (err instanceof ApiError) throw err;
    throw new Error(globalError);
  }
}

export function getPersonAge(birthday: string, deathday: string) {
  if (!birthday) return -1;

  const birthDate = new Date(birthday);
  const secondDate = deathday ? new Date(deathday) : new Date();

  let age = secondDate.getFullYear() - birthDate.getFullYear();
  const monthDiff = secondDate.getMonth() - birthDate.getMonth();
  const dayDiff = secondDate.getDate() - birthDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age -= 1;
  }

  return age;
}

export function sortArray(
  sortType: string,
  credit: MediaCastCredit[] | MediaCrewCredit[]
) {
  const sort = sortType.split('-');
  const sortedCredit = credit.sort((a, b) => {
    if (sort[0] === 'year') return compareByDate(a, b, sort[1]);
    else return compareByPopularity(a, b, sort[1]);
  });

  return sortedCredit;
}
