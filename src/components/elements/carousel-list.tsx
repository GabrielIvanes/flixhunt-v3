import { Element } from '@/utils/global-interfaces';
import CarouselElements from './carousel-elements';

interface Props {
  listName: string;
  elements: Element[];
}

export default function CarouselList({ listName, elements }: Props) {
  return (
    <div className="flex flex-col gap-3 max-w-screen-2xl justify-between px-[calc(3rem+1.25rem+5px)]">
      <h1 className="text-2xl">{listName}</h1>
      <CarouselElements elements={elements} />
    </div>
  );
}
