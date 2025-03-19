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
  Media,
  Person,
} from '@/utils/global-interfaces';
import { Cast, Crew } from '@/utils/person-interfaces';

interface Props {
  elements: ElementInterface[];
  type: 'movies' | 'tv-shows' | 'cast' | 'crew';
  additionalInformation?: boolean;
  writeText?: boolean;
  loop?: boolean;
}

export default function CarouselElements({
  elements,
  type,
  additionalInformation,
  writeText,
  loop = true,
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
            className="mx-2 flex max-w-[175px] justify-center p-0"
          >
            <Element
              id={element.id}
              image={
                type === 'movies' || type === 'tv-shows'
                  ? (element as Media).poster_path
                  : (element as Person).profile_path
              }
              imageStyle={{
                // width: '175px',
                // height: `${175 * 1.5}px`,
                borderRadius: 'var(--radius)',
              }}
              title={
                type === 'movies'
                  ? (element as Media).title
                  : (element as Person).name
              }
              imageFill={true}
              type={type}
              additionalInformation={
                additionalInformation
                  ? type === 'movies' || type === 'tv-shows'
                    ? (element as Media).title
                    : type === 'cast'
                    ? (element as Cast).character
                    : (element as Crew).job
                  : undefined
              }
              writeText={writeText}
              text={
                type === 'movies'
                  ? (element as Media).title
                  : (element as Person).name
              }
              imagePriority={false}
              width={175}
              height={175 * 1.5}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        className={
          writeText
            ? `-left-12 top-[calc(87.5px+2rem)]`
            : '-left-12 top-1/2 -translate-y-1/2'
        }
      />
      <CarouselNext
        className={
          writeText
            ? `-right-12 top-[calc(87.5px+2rem)]`
            : '-right-12 top-1/2 -translate-y-1/2'
        }
      />
    </Carousel>
  );
}
