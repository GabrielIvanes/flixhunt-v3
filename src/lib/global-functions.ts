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
