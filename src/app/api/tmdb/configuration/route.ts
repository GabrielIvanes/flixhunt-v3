export const GET = async () => {
  try {
    const url = `${process.env.TMDB_URL}/configuration`;
    const data = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
      },
    });
    const configuration = await data.json();
    return Response.json(
      { success: true, response: configuration },
      { status: 200, statusText: 'OK' }
    );
  } catch (err) {
    return Response.json(
      { success: false, message: err },
      { status: 500, statusText: 'Internal Server Error' }
    );
  }
};
