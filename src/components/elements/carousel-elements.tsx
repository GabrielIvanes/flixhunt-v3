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
  writeTitle?: boolean;
  loop?: boolean;
}

export default function CarouselElements({
  elements,
  type,
  additionalInformation,
  writeTitle,
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
              title={
                type === 'movies'
                  ? (element as Media).title
                  : (element as Person).name
              }
              width={175}
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
              writeTitle={writeTitle}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
