import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';
import Element from '@/components/elements/element';
import { Element as ElementInterface } from '@/utils/global-interfaces';

interface Props {
  elements: ElementInterface[];
}

export default async function CarouselElements({ elements }: Props) {
  return (
    <Carousel opts={{ loop: true }} className="max-w-full">
      <CarouselContent className="">
        {elements.map((element) => (
          <CarouselItem
            key={element.id}
            className="mx-2 flex max-w-[175px] justify-center p-0"
          >
            <Element
              id={element.id}
              image={element.poster_path}
              title={element.title}
              width={175}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
