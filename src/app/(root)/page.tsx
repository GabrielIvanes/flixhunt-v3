import CarouselList from '@/components/elements/carousel-list';
import {
  getMovieGenres,
  getMoviesByGenre,
  getTheatreMovies,
  getTrendingMovies,
} from '@/lib/movie-functions';
import { getTrendingTvShows } from '@/lib/tv-show-functions';
import { Genre } from '@/utils/global-interfaces';
import { MovieSummary } from '@/utils/movie-interfaces';

export default async function Home() {
  const genres = await getMovieGenres();
  const theatersMovies = await getTheatreMovies();
  const trendingMovies = await getTrendingMovies();
  const trendingTvShows = await getTrendingTvShows();
  console.log(trendingTvShows);
  const moviesByGenres: { genre: Genre; movies: MovieSummary[] }[] = [];

  for (const genre of genres) {
    const movies = await getMoviesByGenre(genre);
    moviesByGenres.push({ genre, movies });
  }

  return (
    <div className="flex flex-col pl-20 gap-10 max-w-full mt-10 justify-between">
      <CarouselList
        listName="Theater movies"
        elements={theatersMovies}
        type="movies"
      />
      <CarouselList
        listName="Trending movies"
        elements={trendingMovies}
        type="movies"
      />
      <CarouselList
        listName="Trending tv shows"
        elements={trendingTvShows}
        type="tv-shows"
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
