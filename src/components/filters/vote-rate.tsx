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

export default function VoteRateFilter({ filters, setFilters }: Props) {
  const ratings = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className="flex flex-col gap-2">
      <H4 text="Vote average" />
      <div className="flex gap-5">
        <div className="flex flex-col">
          <span>Min</span>
          <Select
            key={filters.rateGte}
            value={filters.rateGte === 0 ? '0' : filters.rateGte?.toString()}
            onValueChange={(value) =>
              setFilters((prevFilters) => ({
                ...prevFilters,
                rateGte: value === 'reset' ? undefined : parseInt(value),
                rateLte:
                  prevFilters.rateLte && parseInt(value) > prevFilters.rateLte
                    ? undefined
                    : prevFilters.rateLte,
              }))
            }
          >
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder="Rate" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="reset" className="text-muted-foreground">
                Rate
              </SelectItem>
              {ratings.map((rating) =>
                filters.rateLte ? (
                  rating < filters.rateLte && (
                    <SelectItem key={rating} value={rating.toString()}>
                      {rating}
                    </SelectItem>
                  )
                ) : (
                  <SelectItem key={rating} value={rating.toString()}>
                    {rating}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col">
          <span>Max</span>
          <Select
            key={filters.rateLte}
            value={filters.rateLte?.toString()}
            onValueChange={(value) =>
              setFilters((prevFilters) => ({
                ...prevFilters,
                rateLte: value === 'reset' ? undefined : parseInt(value),
                rateGte:
                  prevFilters.rateGte && parseInt(value) < prevFilters.rateGte
                    ? undefined
                    : prevFilters.rateGte,
              }))
            }
          >
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder="Rate" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="reset" className="text-muted-foreground">
                Rate
              </SelectItem>
              {ratings.map((rating) =>
                filters.rateGte ? (
                  rating > filters.rateGte && (
                    <SelectItem key={rating} value={rating.toString()}>
                      {rating}
                    </SelectItem>
                  )
                ) : (
                  <SelectItem key={rating} value={rating.toString()}>
                    {rating}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
