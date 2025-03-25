import { NextRequest } from 'next/server';

export const GET = async (
  request: NextRequest,
  { params }: { params: { tvShow: string } }
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

    const id = params.tvShow;

    if (!id)
      return Response.json(
        {
          success: false,
          message: 'The request is missing the tv-show id.',
        },
        { status: 400, statusText: 'Bad request' }
      );

    const url = `${process.env.TMDB_URL}/tv/${id}?append_to_response=aggregate_credits,watch/providers,recommendations,content_ratings,videos&language=${language}`;
    const data = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
      },
    });
    const tvShow = await data.json();
    return Response.json(
      { success: true, response: tvShow },
      { status: 200, statusText: 'OK' }
    );
  } catch (err) {
    return Response.json(
      { success: false, message: err },
      { status: 500, statusText: 'Internal Server Error' }
    );
  }
};
