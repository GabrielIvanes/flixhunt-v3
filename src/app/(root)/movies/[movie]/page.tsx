import CarouselList from '@/components/elements/carousel-list';
import Backdrop from '@/components/ui/backdrop';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import TmdbImage from '@/components/ui/tmdb-image';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  H1,
  H3,
  InformationP,
  Lead,
  LinkP,
  P,
} from '@/components/ui/typography';
import {
  convertTime,
  filterCrew,
  getDirectors,
  getTrailer,
} from '@/lib/global-functions';
import { getMovie } from '@/lib/movie-functions';
import { getCertificationsMeaning } from '@/lib/tmdb-config-functions';
import Link from 'next/link';
import { CiBookmark, CiBoxList, CiHeart, CiPen, CiPlay1 } from 'react-icons/ci';
import { FaRegEyeSlash } from 'react-icons/fa';
import { TbMovieOff } from 'react-icons/tb';

export default async function MoviePage({
  params,
}: {
  params: Promise<{ movie: string }>;
}) {
  const { movie: id } = await params;
  const movieDetails = await getMovie(id);
  console.log(movieDetails);
  const countryCode = 'US';
  const directors = getDirectors(movieDetails);
  const providers =
    movieDetails['watch/providers']?.results[countryCode]?.flatrate;
  const trailer = getTrailer(movieDetails);
  const crew = filterCrew(movieDetails);
  const certificationsMeaning = await getCertificationsMeaning('movie');
  const countryCertifications = certificationsMeaning[countryCode];
  console.log(countryCertifications);

  const release_date = movieDetails.release_dates?.results.filter(
    (result) => result.iso_3166_1 === countryCode
  )[0]?.release_dates[0];
  const certificationMeaning = countryCertifications.filter(
    (countryCertification) =>
      countryCertification.certification === release_date?.certification
  )[0]?.meaning;

  return (
    <>
      <Backdrop backdropPath={movieDetails.backdrop_path} />
      <div className="flex flex-col items-center gap-10 min-h-[calc(100vh-4rem-1.25rem)] max-w-full mt-5 z-10 mb-10">
        <div className="flex gap-2 px-5 min-h-[calc(100vh-4rem-1.25rem-1.25rem)]">
          <div className="flex justify-center items-center basis-[33%] min-w-[370px]">
            <TmdbImage
              image={movieDetails.poster_path}
              title={movieDetails.title}
              width={370}
              height={370 * 1.5}
              priority={true}
            />
          </div>
          <div className="basis-[67%] flex flex-col justify-center items-center w-full">
            <div
              className="w-full flex flex-col justify-between"
              style={{ height: `${370 * 1.5}px` }}
            >
              <div className="grow max-h-full">
                <H1 text={movieDetails.title} classname="mb-0" />
                <div className="flex gap-1 items-center mb-2">
                  {release_date &&
                    release_date.certification &&
                    (certificationMeaning ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <InformationP
                              text={`${release_date.certification}`}
                              classname="border border-[hsl(var(--border))] py-1 px-2 mr-2"
                              style={{ borderRadius: 'var(--radius)' }}
                            />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-[500px] break-words text-justify">
                            <p>{certificationMeaning}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      <InformationP
                        text={`${release_date.certification}`}
                        classname="border border-[hsl(var(--border))] py-1 px-2 mr-2"
                        style={{ borderRadius: 'var(--radius)' }}
                      />
                    ))}
                  <InformationP
                    text={`${
                      release_date && release_date.release_date
                        ? release_date.release_date.slice(0, 4)
                        : movieDetails.release_date &&
                          movieDetails.release_date.slice(0, 4)
                    } ${
                      (movieDetails.release_date ||
                        (release_date && release_date.release_date)) &&
                      (movieDetails.runtime ||
                        movieDetails.vote_average ||
                        movieDetails.genres.length > 0) &&
                      '•'
                    } ${
                      movieDetails.runtime && convertTime(movieDetails.runtime)
                    } ${
                      movieDetails.runtime &&
                      (movieDetails.vote_average ||
                        movieDetails.genres.length > 0) &&
                      '•'
                    } ${
                      movieDetails.vote_average &&
                      movieDetails.vote_average.toFixed(1) + '/10'
                    } ${
                      movieDetails.vote_average &&
                      movieDetails.genres.length > 0 &&
                      '•'
                    }`}
                  />

                  {movieDetails.genres.length > 0 && (
                    <div className="h-fit text-sm">
                      {movieDetails.genres.map((genre, index) => (
                        <span key={genre.id}>
                          {index != 0 &&
                            index != movieDetails.genres.length && (
                              <span className="text-sm">, </span>
                            )}
                          <Link href="/" className="text-sm">
                            <LinkP
                              text={genre.name}
                              classname="inline text-sm"
                            />
                          </Link>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <H3 text="Directors" />
                {directors && directors.length > 0 ? (
                  directors.map((director, index) => (
                    <span key={director.id}>
                      {index != 0 && index != directors.length && (
                        <span>, </span>
                      )}
                      <Link href={`/persons/${director.id}`}>
                        <LinkP text={director.name} classname="inline" />
                      </Link>
                    </span>
                  ))
                ) : (
                  <P text="There is no director provided." />
                )}
                <Lead text={movieDetails.tagline} />
                <H3 text="Overview" />
                <P
                  text={
                    movieDetails.overview
                      ? movieDetails.overview
                      : 'There is no overview provided.'
                  }
                  classname="grow overflow-y-auto max-h-[200px]"
                />
                <div className="flex gap-1 items-center mt-5">
                  {trailer && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant={'ghost'}>
                          <CiPlay1 />
                          Run Trailer
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px] sm:h-[330px] lg:max-w-[800px] lg:h-[550px]">
                        <DialogHeader className=" h-fit">
                          <DialogTitle>Trailer</DialogTitle>
                        </DialogHeader>
                        <div className="w-full lg:h-[450px] sm:h-[230px]">
                          <iframe
                            src={`https://www.youtube.com/embed/${trailer.key}?rel=0`}
                            allowFullScreen
                            title={`${trailer.name}`}
                            className="w-full h-full"
                          ></iframe>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button size={'icon'} variant={'outline'}>
                          <CiHeart />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="bg-background text-muted-foreground">
                        <p>Like this movie</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button size={'icon'} variant={'outline'}>
                          <CiBookmark />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="bg-background text-muted-foreground">
                        <p>Save this movie</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button size={'icon'} variant={'outline'}>
                          <FaRegEyeSlash />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="bg-background text-muted-foreground">
                        <p>Add it to your watchlist</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button size={'icon'} variant={'outline'}>
                          <TbMovieOff />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="bg-background text-muted-foreground">
                        <p>Add it to your theater watchlist</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button size={'icon'} variant={'outline'}>
                          <CiBoxList />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="bg-background text-muted-foreground">
                        <p>Add it to a list</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button size={'icon'} variant={'outline'}>
                          <CiPen />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="bg-background text-muted-foreground">
                        <p>Write a comment</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              {providers && providers.length > 0 && (
                <div>
                  <H3 text="Streaming" classname="mb-2" />
                  <div className="flex items-center gap-1">
                    {providers.map((provider) => (
                      <TooltipProvider key={provider.provider_id}>
                        <Tooltip>
                          <TooltipTrigger>
                            <TmdbImage
                              image={provider.logo_path}
                              title={provider.provider_name}
                              width={45}
                              height={45}
                              style={{ borderRadius: 'var(--radius)' }}
                            />
                          </TooltipTrigger>
                          <TooltipContent className="bg-background text-muted-foreground">
                            <p>{provider.provider_name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <CarouselList
          listName="Cast"
          elements={movieDetails.credits.cast}
          type="cast"
          writeTitle={true}
          additionalInformation={true}
          loop={false}
        />
        <CarouselList
          listName="Crew"
          elements={crew}
          type="crew"
          writeTitle={true}
          additionalInformation={true}
          loop={false}
        />
        <CarouselList
          listName="Recommendations"
          elements={movieDetails.recommendations.results}
          type="movies"
        />
      </div>
    </>
  );
}
