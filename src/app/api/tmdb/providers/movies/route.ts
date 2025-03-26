import { NextRequest } from 'next/server';

export const GET = async (request: NextRequest) => {
  try {
    const searchParams = request.nextUrl.searchParams;
    const language = searchParams.get('language');
    const region = searchParams.get('region');

    if (!language)
      return Response.json(
        {
          success: false,
          message: 'The request is missing a language query param.',
        },
        { status: 400, statusText: 'Bad request' }
      );

    if (!region)
      return Response.json(
        {
          success: false,
          message: 'The request is missing a region query param.',
        },
        { status: 400, statusText: 'Bad request' }
      );

    const url = `${process.env.TMDB_URL}/watch/providers/movie?watch_region=${region}&language=${language}`;
    const data = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
      },
    });
    const providers = await data.json();
    return Response.json(
      { success: true, response: providers },
      { status: 200, statusText: 'OK' }
    );
  } catch (err) {
    return Response.json(
      { success: false, message: err },
      { status: 500, statusText: 'Internal Server Error' }
    );
  }
};
