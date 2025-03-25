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

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import TmdbImage from '@/components/ui/tmdb-image';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { H1, H3, InformationP, P } from '@/components/ui/typography';
import { filterCrew, getTrailer } from '@/lib/global-functions';
import { getSeason, getTvShow } from '@/lib/tv-show-functions';
import { CiBookmark, CiBoxList, CiHeart, CiPen, CiPlay1 } from 'react-icons/ci';
import { FaRegEyeSlash } from 'react-icons/fa';

export default async function Season({
  params,
}: {
  params: Promise<{ tvShow: string; season: string }>;
}) {
  const { tvShow: tvShowId, season: id } = await params;
  const seasonDetails = await getSeason(tvShowId, id);
  const tvShowDetails = await getTvShow(tvShowId);
  console.log(seasonDetails);
  const countryCode = 'US';
  const crew = filterCrew(seasonDetails);
  const providers =
    seasonDetails['watch/providers']?.results[countryCode]?.flatrate;
  const trailer = getTrailer(seasonDetails);

  return (
    <>
      <Breadcrumb className="absolute left-5 top-24 z-20">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/tv-shows/${tvShowId}`}>
              {tvShowDetails.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{seasonDetails.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Backdrop backdropPath={tvShowDetails.backdrop_path} />
      <div className="flex flex-col items-start pl-20 gap-10 min-h-[calc(100vh-4rem-2.5rem)] w-full max-w-full mt-5 z-10 pb-10">
        <div className="flex gap-2 px-5 min-h-[calc(100vh-4rem-1.25rem-1.25rem)] ">
          <div className="flex justify-center items-center basis-1/3 min-w-[370px]">
            <TmdbImage
              image={seasonDetails.poster_path}
              title={seasonDetails.name}
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
                <H1 text={seasonDetails.name} classname="mb-0" />
                <div className="flex gap-1 items-center mb-2">
                  <InformationP
                    text={`${
                      seasonDetails.air_date
                        ? seasonDetails.air_date.slice(0, 4)
                        : ''
                    }  ${
                      seasonDetails.air_date &&
                      ((seasonDetails.episodes &&
                        seasonDetails.episodes.length > 0) ||
                        seasonDetails.vote_average)
                        ? '•'
                        : ''
                    } ${
                      seasonDetails.episodes &&
                      seasonDetails.episodes.length > 0
                        ? `${seasonDetails.episodes.length} ep`
                        : ''
                    } ${
                      seasonDetails.episodes &&
                      seasonDetails.episodes.length > 0 &&
                      seasonDetails.vote_average
                        ? '•'
                        : ''
                    } ${
                      seasonDetails.vote_average
                        ? seasonDetails.vote_average.toFixed(1) + '/10'
                        : ''
                    }`}
                  />
                </div>

                <H3 text="Overview" />
                <P
                  text={
                    seasonDetails.overview
                      ? seasonDetails.overview
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
          listName="Episode"
          elements={seasonDetails.episodes}
          type="episodes"
          additionalInformation={true}
          loop={false}
          writeText={true}
          width={150 * (16 / 9)}
          height={150}
        />
        <CarouselList
          listName="Cast"
          elements={seasonDetails.credits.cast}
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
      </div>
    </>
  );
}
