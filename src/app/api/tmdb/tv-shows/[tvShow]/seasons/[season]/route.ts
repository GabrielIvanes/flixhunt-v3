import { NextRequest } from 'next/server';

export const GET = async (
  request: NextRequest,
  { params }: { params: { tvShow: string; season: string } }
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
    const id = params.season;

    if (!id)
      return Response.json(
        {
          success: false,
          message: 'The request is missing the season id.',
        },
        { status: 400, statusText: 'Bad request' }
      );

    if (!tvShowId) {
      return Response.json(
        {
          success: false,
          message: 'The request is missing the tv-show id.',
        },
        { status: 400, statusText: 'Bad request' }
      );
    }

    const url = `${process.env.TMDB_URL}/tv/${tvShowId}/season/${id}?append_to_response=credits,videos,watch/providers&language=${language}`;
    const data = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
      },
    });
    const season = await data.json();
    return Response.json(
      { success: true, response: season },
      { status: 200, statusText: 'OK' }
    );
  } catch (err) {
    return Response.json(
      { success: false, message: err },
      { status: 500, statusText: 'Internal Server Error' }
    );
  }
};
