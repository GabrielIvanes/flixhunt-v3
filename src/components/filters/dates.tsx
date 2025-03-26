import { H3, P } from '@/components/ui/typography';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Filters } from '@/utils/global-interfaces';
import { getYear } from 'date-fns';

interface Props {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

export default function DatesFilter({ filters, setFilters }: Props) {
  const years = Array.from(
    { length: getYear(new Date()) - 1895 + 1 },
    (_, i) => 1895 + i
  );

  return (
    <>
      <H3 text="Date" classname="mt-5 mb-4" />
      <div className="flex gap-5 mt-2">
        <div className="flex flex-col gap-1">
          <P text="From" />
          <Select
            key={filters.dateGte}
            value={filters.dateGte?.toString()}
            onValueChange={(value) =>
              setFilters((prevFilters) => ({
                ...prevFilters,
                dateGte: value === 'reset' ? undefined : parseInt(value),
                dateLte:
                  prevFilters.dateLte &&
                  value !== 'reset' &&
                  parseInt(value) > prevFilters.dateLte
                    ? undefined
                    : prevFilters.dateLte,
              }))
            }
          >
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="reset" className="text-muted-foreground">
                Year
              </SelectItem>
              {years.map((year) =>
                filters.dateLte ? (
                  year < filters.dateLte && (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  )
                ) : (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1">
          <P text="To" />
          <Select
            key={filters.dateLte}
            value={filters.dateLte?.toString()}
            onValueChange={(value) =>
              setFilters((prevFilters) => ({
                ...prevFilters,
                dateLte: value === 'reset' ? undefined : parseInt(value),
                dateGte:
                  prevFilters.dateGte &&
                  value != 'reset' &&
                  parseInt(value) < prevFilters.dateGte
                    ? undefined
                    : prevFilters.dateGte,
              }))
            }
          >
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="reset" className="text-muted-foreground">
                Year
              </SelectItem>
              {years.map((year) =>
                filters.dateGte ? (
                  year > filters.dateGte && (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  )
                ) : (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
}
