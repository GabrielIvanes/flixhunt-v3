import { Element } from '@/utils/global-interfaces';
import CarouselElements from './carousel-elements';
import { H1 } from '../ui/typography';

interface Props {
  listName: string;
  elements: Element[];
  type: 'movies' | 'tv-shows' | 'cast' | 'crew' | 'seasons' | 'episodes';
  additionalInformation?: boolean;
  writeText?: boolean;
  loop?: boolean;
  width?: number;
  height?: number;
}

export default function CarouselList({
  listName,
  elements,
  type,
  additionalInformation,
  writeText,
  loop,
  width,
  height,
}: Props) {
  return (
    <div
      className="flex flex-col w-fit max-w-[calc(100%-5rem)] justify-between"
      style={{ borderRadius: 'var(--radius)' }}
    >
      <H1 text={listName} classname="p-3" />
      <CarouselElements
        elements={elements}
        type={type}
        additionalInformation={additionalInformation}
        writeText={writeText}
        loop={loop}
        width={width}
        height={height}
      />
    </div>
  );
}
