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
    <div className="flex gap-10 max-w-full mt-5 flex-col items-center justify-between overflow-hidden">
      <CarouselList listName="Theater movies" elements={theatersMovies} />
      <CarouselList listName="Popular movies" elements={popularMovies} />
      {moviesByGenres.map((moviesByGenre) => (
        <CarouselList
          key={moviesByGenre.genre.id}
          listName={moviesByGenre.genre.name}
          elements={moviesByGenre.movies}
        />
      ))}
    </div>
  );
}
