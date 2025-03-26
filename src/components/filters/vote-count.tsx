import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Filters } from '@/utils/global-interfaces';
import { H4 } from '../ui/typography';

interface Props {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

export default function VoteCountFilter({ filters, setFilters }: Props) {
  const counts = Array.from({ length: 200 }, (_, i) => (i + 1) * 50);

  return (
    <div className="flex flex-col gap-2">
      <H4 text="Vote count" />
      <div className="flex flex-col">
        <span>Min</span>
        <Select
          key={filters.voteGte}
          value={filters.voteGte?.toString()}
          onValueChange={(value) =>
            setFilters((prevFilters) => ({
              ...prevFilters,
              voteGte: value === 'reset' ? undefined : parseInt(value),
            }))
          }
        >
          <SelectTrigger className="w-[110px]">
            <SelectValue placeholder="Count" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="reset" className="text-muted-foreground">
              Count
            </SelectItem>
            {counts.map((count) => (
              <SelectItem key={count} value={count.toString()}>
                {count}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
