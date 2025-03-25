import { NextRequest } from 'next/server';

export const GET = async (
  request: NextRequest,
  { params }: { params: { tvShow: string; season: string; episode: string } }
) => {
  try {
    const searchParams = request.nextUrl.searchParams;
    const language = searchParams.get('language');

    if (!language)
      return Response.json(
        {
          success: false,
          message: 'The request is missing a language query param.',
        },
        { status: 400, statusText: 'Bad request' }
      );

    const tvShowId = params.tvShow;
    const seasonId = params.season;
    const id = params.episode;

    if (!id)
      return Response.json(
        {
          success: false,
          message: 'The request is missing the season id.',
        },
        { status: 400, statusText: 'Bad request' }
      );

    if (!seasonId) {
      return Response.json(
        {
          success: false,
          message: 'The request is missing the tv-show id.',
        },
        { status: 400, statusText: 'Bad request' }
      );
    }

    if (!tvShowId) {
      return Response.json(
        {
          success: false,
          message: 'The request is missing the tv-show id.',
        },
        { status: 400, statusText: 'Bad request' }
      );
    }

    const url = `${process.env.TMDB_URL}/tv/${tvShowId}/season/${seasonId}/episode/${id}?append_to_response=credits,videos&language=${language}`;
    const data = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
      },
    });
    const episode = await data.json();
    return Response.json(
      { success: true, response: episode },
      { status: 200, statusText: 'OK' }
    );
  } catch (err) {
    return Response.json(
      { success: false, message: err },
      { status: 500, statusText: 'Internal Server Error' }
    );
  }
};
