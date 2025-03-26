import { NextRequest } from 'next/server';

export const GET = async (request: NextRequest) => {
  try {
    const searchParams = request.nextUrl.searchParams;
    const language = searchParams.get('language');
    const page = searchParams.get('page') || 1;
    const genres = searchParams.get('genres');
    const voteGte = searchParams.get('vote-gte');
    const rateGte = searchParams.get('rate-gte');
    const rateLte = searchParams.get('rate-lte');
    const dateGte = searchParams.get('date-gte');
    const dateLte = searchParams.get('date-lte');
    const providers = searchParams.get('providers');
    const region = searchParams.get('region');
    const keywords = searchParams.get('keywords');

    if (!language)
      return Response.json(
        {
          success: false,
          message: 'The request is missing a language query param.',
        },
        { status: 400, statusText: 'Bad request' }
      );

    if ((!providers && region) || (!region && providers)) {
      return Response.json(
        {
          success: false,
          message:
            'The request is missing the region or the providers query param.',
        },
        { status: 400, statusText: 'Bad request' }
      );
    }

    let url = `${process.env.TMDB_URL}/discover/tv?include_adult=false&sort_by=vote_average.desc&language=${language}&page=${page}`;
    if (genres) url += `&with_genres=${genres}`;
    if (providers && region)
      url += `&watch_region=${region}&with_watch_providers=${providers}`;
    if (keywords) url += `&with_keywords=${keywords}`;

    if (dateGte) url += `&first_air_date.gte=${dateGte}-01-01`;
    if (dateLte) url += `&first_air_date.lte=${dateLte}-12-31`;
    if (voteGte) url += `&vote_count.gte=${voteGte}`;
    if (rateGte) url += `&vote_average.gte=${rateGte}`;
    if (rateLte) url += `&vote_average.lte=${rateLte}`;

    console.log(url);

    const data = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
      },
    });
    const tvShows = await data.json();
    return Response.json(
      { success: true, response: tvShows },
      { status: 200, statusText: 'OK' }
    );
  } catch (err) {
    return Response.json(
      { success: false, message: err },
      { status: 500, statusText: 'Internal Server Error' }
    );
  }
};
