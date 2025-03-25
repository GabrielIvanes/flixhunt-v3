import { getEpisode, getTvShow } from '@/lib/tv-show-functions';

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
import { convertTime, filterCrew, getTrailer } from '@/lib/global-functions';
import { CiBookmark, CiBoxList, CiHeart, CiPen, CiPlay1 } from 'react-icons/ci';
import { FaRegEyeSlash } from 'react-icons/fa';

export default async function Episode({
  params,
}: {
  params: Promise<{ tvShow: string; season: string; episode: string }>;
}) {
  const { tvShow: tvShowId, season: seasonId, episode: id } = await params;
  const tvShowDetails = await getTvShow(tvShowId);
  const episodeDetails = await getEpisode(tvShowId, seasonId, id);
  console.log(episodeDetails);
  //   const countryCode = 'US';
  const crew = filterCrew(episodeDetails);
  const trailer = getTrailer(episodeDetails);
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
            <BreadcrumbLink href={`/tv-shows/${tvShowId}/seasons/${seasonId}`}>
              {`Season ${seasonId}`}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{episodeDetails.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Backdrop backdropPath={tvShowDetails.backdrop_path} />
      <div className="flex flex-col items-start pl-20 gap-10 min-h-[calc(100vh-4rem-2.5rem)] w-full max-w-full mt-5 z-10 pb-10">
        <div className="flex gap-2 px-5 min-h-[calc(100vh-4rem-1.25rem-1.25rem)] ">
          <div className="flex justify-center items-center min-w-[500px]">
            <TmdbImage
              image={episodeDetails.still_path}
              title={episodeDetails.name}
              width={500}
              height={500 * (9 / 16)}
              priority={true}
            />
          </div>
          <div className="flex flex-col justify-center items-center w-full">
            <div
              className="w-full flex flex-col justify-between"
              style={{ height: `${500 * (9 / 16)}px` }}
            >
              <div className="grow max-h-full">
                <H1 text={episodeDetails.name} classname="mb-0" />
                <div className="flex gap-1 items-center mb-2">
                  <InformationP
                    text={`${
                      episodeDetails.air_date
                        ? episodeDetails.air_date.slice(0, 4)
                        : ''
                    } ${
                      episodeDetails.air_date &&
                      ((episodeDetails.runtime && episodeDetails.runtime > 0) ||
                        episodeDetails.vote_average)
                        ? '•'
                        : ''
                    } ${
                      episodeDetails.runtime && episodeDetails.runtime > 0
                        ? convertTime(episodeDetails.runtime)
                        : ''
                    } ${
                      episodeDetails.runtime &&
                      episodeDetails.runtime > 0 &&
                      episodeDetails.vote_average
                        ? '•'
                        : ''
                    } ${
                      episodeDetails.vote_average
                        ? episodeDetails.vote_average.toFixed(1) + '/10'
                        : ''
                    } `}
                  />
                </div>

                <H3 text="Overview" />
                <P
                  text={
                    episodeDetails.overview
                      ? episodeDetails.overview
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
            </div>
          </div>
        </div>
        {/* <div className="flex flex-col max-w-full pl-20"> */}
        <CarouselList
          listName="Cast"
          elements={episodeDetails.credits.cast}
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
        {/* </div> */}
      </div>
    </>
  );
}
