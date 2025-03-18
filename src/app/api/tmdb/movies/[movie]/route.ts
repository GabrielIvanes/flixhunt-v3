import { NextRequest } from 'next/server';

export const GET = async (
  request: NextRequest,
  { params }: { params: { movie: string } }
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

    const id = params.movie;

    if (!id)
      return Response.json(
        {
          success: false,
          message: 'The request is missing the movie id.',
        },
        { status: 400, statusText: 'Bad request' }
      );

    const url = `${process.env.TMDB_URL}/movie/${id}?append_to_response=credits,watch/providers,recommendations,videos,release_dates&language=${language}`;
    console.log(url);
    const data = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
      },
    });
    const movie = await data.json();
    return Response.json(
      { success: true, response: movie },
      { status: 200, statusText: 'OK' }
    );
  } catch (err) {
    return Response.json(
      { success: false, message: err },
      { status: 500, statusText: 'Internal Server Error' }
    );
  }
};
