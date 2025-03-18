import { ApiError } from 'next/dist/server/api-utils';
import { TmdbConfiguration } from '../utils/tmdb-config-interfaces';
import { fetchData } from './global-functions';
import { CountryCertifications } from '@/utils/global-interfaces';

export async function getTmdbConfiguration() {
  const globalError = 'Failed to fetch tmdb configuration.';

  try {
    const url = `${process.env.BASE_URL}/api/tmdb/configuration`;
    const option = { next: { revalidate: 86400 } };
    const configuration: TmdbConfiguration = await fetchData(
      url,
      globalError,
      option
    );

    return configuration;
  } catch (err) {
    console.log(err);
    if (err instanceof ApiError) throw err;
    throw new Error(globalError);
  }
}

export async function getCertificationsMeaning(media: 'movie' | 'tv') {
  const globalError = 'Failed to fetch tmdb certifications.';

  try {
    const url = `${process.env.BASE_URL}/api/tmdb/certifications?media=${media}`;
    const option = { next: { revalidate: 86400 } };
    const certifications: CountryCertifications = (
      await fetchData(url, globalError, option)
    ).certifications;

    return certifications;
  } catch (err) {
    console.log(err);
    if (err instanceof ApiError) throw err;
    throw new Error(globalError);
  }
}
