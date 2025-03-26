import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { IoFilterSharp } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';
import PersonsFilter from '@/components/filters/persons';
import KeywordsFilter from '@/components/filters/keywords';
import ProvidersFilter from '@/components/filters/providers';
import GenresFilters from '@/components/filters/genres';
import DatesFilter from '@/components/filters/dates';
import VoteFilter from '@/components/filters/vote';

import {
  Filters as FiltersInterface,
  Genre,
  Providers,
} from '@/utils/global-interfaces';

interface Props {
  filters: FiltersInterface;
  setFilters: React.Dispatch<React.SetStateAction<FiltersInterface>>;
  genres: Genre[];
  providers: Providers | undefined;
  personsIn: boolean;
  setPersonsIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Filters({
  filters,
  setFilters,
  genres,
  providers,
  personsIn,
  setPersonsIn,
}: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-fit" variant={'ghost'}>
          Filters <IoFilterSharp />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[500px] overflow-y-auto min-w-[650px] w-fit max-w-[90%]">
        <DialogHeader>
          <DialogTitle>Filters</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col">
          <GenresFilters
            genres={genres}
            filters={filters}
            setFilters={setFilters}
          />
          <DatesFilter filters={filters} setFilters={setFilters} />
          <VoteFilter filters={filters} setFilters={setFilters} />
          <ProvidersFilter
            providers={providers}
            filters={filters}
            setFiltersAction={setFilters}
          />
          <KeywordsFilter filters={filters} setFiltersAction={setFilters} />
          <PersonsFilter
            personsIn={personsIn}
            setPersonsInAction={setPersonsIn}
            filters={filters}
            setFiltersAction={setFilters}
          />
          <Button
            onClick={() =>
              setFilters((prevFilters) => ({
                ...prevFilters,
                page: 1,
                genres: undefined,
                dateGte: undefined,
                dateLte: undefined,
                voteGte: 8000,
                voteLte: undefined,
                rateGte: undefined,
                rateLte: undefined,
                providers: undefined,
                keywords: undefined,
              }))
            }
            variant="destructive"
            className="flex items-center mt-5"
          >
            <div>Clear all</div>
            <RxCross2 />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
