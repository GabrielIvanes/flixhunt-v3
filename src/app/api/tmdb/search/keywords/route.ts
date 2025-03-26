import { NextRequest } from 'next/server';

export const GET = async (request: NextRequest) => {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');

    if (!query)
      return Response.json(
        {
          success: false,
          message: 'The request is missing a query param.',
        },
        { status: 400, statusText: 'Bad request' }
      );

    const url = `${process.env.TMDB_URL}/search/keyword?query=${query}&page=1`;
    const data = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
      },
    });
    const keywords = await data.json();
    return Response.json(
      { success: true, response: keywords },
      { status: 200, statusText: 'OK' }
    );
  } catch (err) {
    return Response.json(
      { success: false, message: err },
      { status: 500, statusText: 'Internal Server Error' }
    );
  }
};
