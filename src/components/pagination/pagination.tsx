import {
  Pagination as PaginationWrapper,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Filters } from '@/utils/global-interfaces';

interface Props {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  totalPages: number;
}

export default function Pagination({ filters, setFilters, totalPages }: Props) {
  return (
    <PaginationWrapper>
      <PaginationContent>
        {filters.page > 1 && (
          <>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => {
                  setFilters((prevFilters) => ({
                    ...prevFilters,
                    page: prevFilters.page - 1,
                  }));
                  window.scrollTo(0, 0);
                }}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                onClick={() => {
                  setFilters((prevFilters) => ({
                    ...prevFilters,
                    page: 1,
                  }));
                  window.scrollTo(0, 0);
                }}
              >
                1
              </PaginationLink>
            </PaginationItem>
            {filters.page > 3 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {filters.page > 2 && (
              <PaginationItem>
                <PaginationLink
                  onClick={() => {
                    setFilters((prevFilters) => ({
                      ...prevFilters,
                      page: prevFilters.page - 1,
                    }));
                    window.scrollTo(0, 0);
                  }}
                >
                  {filters.page - 1}
                </PaginationLink>
              </PaginationItem>
            )}
          </>
        )}
        <PaginationItem>
          <PaginationLink isActive>{filters.page}</PaginationLink>
        </PaginationItem>
        {filters.page < totalPages && (
          <>
            {filters.page + 1 < totalPages && (
              <PaginationItem>
                <PaginationLink
                  onClick={() => {
                    setFilters((prevFilters) => ({
                      ...prevFilters,
                      page: prevFilters.page + 1,
                    }));
                    window.scrollTo(0, 0);
                  }}
                >
                  {filters.page + 1}
                </PaginationLink>
              </PaginationItem>
            )}
            {filters.page + 2 < totalPages && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink
                onClick={() => {
                  setFilters((prevFilters) => ({
                    ...prevFilters,
                    page: totalPages,
                  }));
                  window.scrollTo(0, 0);
                }}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={() => {
                  setFilters((prevFilters) => ({
                    ...prevFilters,
                    page: prevFilters.page + 1,
                  }));
                  window.scrollTo(0, 0);
                }}
              />
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </PaginationWrapper>
  );
}
