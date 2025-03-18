import CarouselList from '@/components/elements/carousel-list';
import {
  getMovieGenres,
  getMoviesByGenre,
  getPopularMovies,
  getTheatreMovies,
} from '@/lib/movie-functions';
import { Genre } from '@/utils/global-interfaces';
import { MovieSummary } from '@/utils/movie-interfaces';

export default async function Home() {
  const genres = await getMovieGenres();
  const theatersMovies = await getTheatreMovies();
  const popularMovies = await getPopularMovies();
  const moviesByGenres: { genre: Genre; movies: MovieSummary[] }[] = [];

  for (const genre of genres) {
    const movies = await getMoviesByGenre(genre);
    moviesByGenres.push({ genre, movies });
  }

  return (
    <div className="flex flex-col gap-10 max-w-full mt-10 items-center justify-between">
      <CarouselList
        listName="Theater movies"
        elements={theatersMovies}
        type="movies"
      />
      <CarouselList
        listName="Popular movies"
        elements={popularMovies}
        type="movies"
      />
      {moviesByGenres.map((moviesByGenre) => (
        <CarouselList
          key={moviesByGenre.genre.id}
          listName={moviesByGenre.genre.name}
          elements={moviesByGenre.movies}
          type="movies"
        />
      ))}
    </div>
  );
}
