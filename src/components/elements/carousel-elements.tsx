import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';
import Element from '@/components/elements/element';
import {
  Element as ElementInterface,
  Episode,
  Media,
  Movie,
  Person,
  TvShow,
} from '@/utils/global-interfaces';
import { Cast, Crew } from '@/utils/person-interfaces';

interface Props {
  elements: ElementInterface[];
  type: 'movies' | 'tv-shows' | 'cast' | 'crew' | 'seasons' | 'episodes';
  additionalInformation?: boolean;
  writeText?: boolean;
  loop?: boolean;
  width?: number;
  height?: number;
}

export default function CarouselElements({
  elements,
  type,
  additionalInformation,
  writeText,
  loop = true,
  width = 175,
  height = 175 * 1.5,
}: Props) {
  return (
    <Carousel
      {...(loop ? { opts: { loop: true } } : {})}
      className="max-w-full"
    >
      <CarouselContent className={loop ? 'pl-0' : 'pl-3'}>
        {elements.map((element) => (
          <CarouselItem
            key={element.id}
            className={`mx-2 flex justify-center p-0`}
            style={{ maxWidth: `${width}px` }}
          >
            <Element
              id={
                'season_number' in element
                  ? 'episode_number' in element
                    ? element.episode_number
                    : element.season_number
                  : element.id
              }
              image={
                type === 'movies' || type === 'tv-shows' || type == 'seasons'
                  ? (element as Media).poster_path
                  : type === 'episodes'
                  ? (element as Episode).still_path
                  : (element as Person).profile_path
              }
              imageStyle={{
                borderRadius: 'var(--radius)',
              }}
              title={'name' in element ? element.name : element.title}
              imageFill={true}
              type={type}
              additionalInformation={
                additionalInformation
                  ? 'jobs' in element
                    ? element.jobs.map((job) => job.job).join(', ')
                    : 'roles' in element
                    ? element.roles.map((role) => role.character).join(', ')
                    : type === 'movies'
                    ? (element as Movie).title
                    : type === 'tv-shows'
                    ? (element as TvShow).name
                    : type === 'cast'
                    ? (element as Cast).character
                    : (element as Crew).job
                  : undefined
              }
              writeText={writeText}
              text={
                type === 'episodes'
                  ? `E${(element as Episode).episode_number} - ${
                      (element as Episode).name
                    }`
                  : 'name' in element
                  ? element.name
                  : element.title
              }
              imagePriority={false}
              width={width}
              height={height}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        className={writeText ? `-left-12` : '-left-12 top-1/2 -translate-y-1/2'}
        style={writeText ? { top: `calc(${height / 2}px - 1rem)` } : {}}
      />
      <CarouselNext
        className={
          writeText ? `-right-12` : '-right-12 top-1/2 -translate-y-1/2'
        }
        style={writeText ? { top: `calc(${height / 2}px - 1rem)` } : {}}
      />
    </Carousel>
  );
}
