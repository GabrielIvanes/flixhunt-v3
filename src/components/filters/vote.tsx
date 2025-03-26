import { Filters } from '@/utils/global-interfaces';
import { H3 } from '../ui/typography';
import VoteCountFilter from './vote-count';
import VoteRateFilter from './vote-rate';

interface Props {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

export default function VoteFilter({ filters, setFilters }: Props) {
  return (
    <>
      <H3 text="User vote and rate" classname="mt-5 mb-4" />
      <div className="flex gap-10">
        <VoteRateFilter filters={filters} setFilters={setFilters} />
        <VoteCountFilter filters={filters} setFilters={setFilters} />
      </div>
    </>
  );
}
