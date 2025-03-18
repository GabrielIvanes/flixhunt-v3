import { Element } from '@/utils/global-interfaces';
import CarouselElements from './carousel-elements';
import { H1 } from '../ui/typography';

interface Props {
  listName: string;
  elements: Element[];
  type: 'movies' | 'tv-shows' | 'cast' | 'crew';
  additionalInformation?: boolean;
  writeTitle?: boolean;
  loop?: boolean;
}

export default function CarouselList({
  listName,
  elements,
  type,
  additionalInformation,
  writeTitle,
  loop,
}: Props) {
  return (
    <div
      className="flex flex-col max-w-[calc(100%-4rem-6rem)] justify-between"
      style={{ borderRadius: 'var(--radius)' }}
    >
      <H1 text={listName} classname="p-3" />
      <CarouselElements
        elements={elements}
        type={type}
        additionalInformation={additionalInformation}
        writeTitle={writeTitle}
        loop={loop}
      />
    </div>
  );
}
