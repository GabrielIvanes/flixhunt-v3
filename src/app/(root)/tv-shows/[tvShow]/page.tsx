// test avec lui: 1204967

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
  filterAggregateCrew,
  getDirectors,
  getTrailer,
} from '@/lib/global-functions';
import { getCertificationsMeaning } from '@/lib/tmdb-config-functions';
import { getTvShow, getTvShowDate } from '@/lib/tv-show-functions';
import Link from 'next/link';
import { CiBookmark, CiBoxList, CiHeart, CiPen, CiPlay1 } from 'react-icons/ci';
import { FaRegEyeSlash } from 'react-icons/fa';

export default async function MoviePage({
  params,
}: {
  params: Promise<{ tvShow: string }>;
}) {
  const { tvShow: id } = await params;
  const tvShowDetails = await getTvShow(id);
  console.log(tvShowDetails);
  const countryCode = 'US';
  const directors = getDirectors(tvShowDetails);
  const crew = filterAggregateCrew(tvShowDetails);
  const providers =
    tvShowDetails['watch/providers']?.results[countryCode]?.flatrate;
  const trailer = getTrailer(tvShowDetails);
  const certificationsMeaning = await getCertificationsMeaning('tv');
  const countryCertifications = certificationsMeaning[countryCode];
  console.log(countryCertifications);

  const content_rating = tvShowDetails.content_ratings.results.filter(
    (result) => result.iso_3166_1 === countryCode
  )[0];

  const certificationMeaning = countryCertifications.filter(
    (countryCertification) =>
      countryCertification.certification === content_rating?.rating
  )[0]?.meaning;

  return (
    <>
      <Backdrop backdropPath={tvShowDetails.backdrop_path} />
      <div className="flex flex-col items-start pl-20 gap-10 min-h-[calc(100vh-4rem-2.5rem)] w-full max-w-full mt-5 z-10 pb-10">
        <div className="flex gap-2 px-5 min-h-[calc(100vh-4rem-1.25rem-1.25rem)] ">
          <div className="flex justify-center items-center basis-1/3 min-w-[370px]">
            <TmdbImage
              image={tvShowDetails.poster_path}
              title={tvShowDetails.name}
              width={370}
              height={370 * 1.5}
              priority={true}
            />
          </div>
          <div className="basis-2/3 flex flex-col justify-center items-center w-full">
            <div
              className="w-full flex flex-col justify-between"
              style={{ height: `${370 * 1.5}px` }}
            >
              <div className="grow max-h-full">
                <H1 text={tvShowDetails.name} classname="mb-0" />
                <div className="flex gap-1 items-center mb-2">
                  {content_rating &&
                    content_rating.rating &&
                    (certificationMeaning ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <InformationP
                              text={`${content_rating.rating}`}
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
                        text={`${content_rating.rating}`}
                        classname="border border-[hsl(var(--border))] py-1 px-2 mr-2"
                        style={{ borderRadius: 'var(--radius)' }}
                      />
                    ))}
                  <InformationP
                    text={`${getTvShowDate(
                      tvShowDetails.first_air_date,
                      tvShowDetails.last_air_date,
                      tvShowDetails.status
                    )} ${
                      tvShowDetails.first_air_date &&
                      (tvShowDetails.number_of_seasons ||
                        tvShowDetails.number_of_episodes ||
                        tvShowDetails.vote_average ||
                        tvShowDetails.genres.length > 0) &&
                      '•'
                    } ${
                      tvShowDetails.number_of_seasons &&
                      `${tvShowDetails.number_of_seasons} s`
                    } ${
                      tvShowDetails.number_of_seasons &&
                      (tvShowDetails.number_of_episodes ||
                        tvShowDetails.vote_average ||
                        tvShowDetails.genres.length > 0) &&
                      '•'
                    } ${
                      tvShowDetails.number_of_episodes &&
                      `${tvShowDetails.number_of_episodes} ep`
                    } ${
                      tvShowDetails.number_of_episodes &&
                      (tvShowDetails.vote_average ||
                        tvShowDetails.genres.length > 0) &&
                      '•'
                    } ${
                      tvShowDetails.vote_average &&
                      tvShowDetails.vote_average.toFixed(1) + '/10'
                    } ${
                      tvShowDetails.vote_average &&
                      tvShowDetails.genres.length > 0 &&
                      '•'
                    }`}
                  />

                  {tvShowDetails.genres.length > 0 && (
                    <div className="h-fit text-sm">
                      {tvShowDetails.genres.map((genre, index) => (
                        <span key={genre.id}>
                          {index != 0 &&
                            index != tvShowDetails.genres.length && (
                              <span className="text-sm">, </span>
                            )}
                          <Link
                            href={`/tv-shows?genre=${genre.id}`}
                            className="text-sm"
                          >
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
                <Lead text={tvShowDetails.tagline} />
                <H3 text="Overview" />
                <P
                  text={
                    tvShowDetails.overview
                      ? tvShowDetails.overview
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
          listName="Seasons"
          elements={tvShowDetails.seasons}
          type="seasons"
          additionalInformation={true}
          loop={false}
          writeText={true}
        />
        <CarouselList
          listName="Cast"
          elements={tvShowDetails.aggregate_credits.cast}
          type="cast"
          additionalInformation={true}
          loop={false}
          writeText={true}
        />
        <CarouselList
          listName="Crew"
          elements={crew}
          type="crew"
          writeText={true}
          additionalInformation={true}
          loop={false}
        />
        <CarouselList
          listName="Recommendations"
          elements={tvShowDetails.recommendations.results}
          type="tv-shows"
        />
      </div>
    </>
  );
}
