'use client';

import Element from '@/components/elements/element';
import React, { useState } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { MoviesResult } from '@/utils/movie-interfaces';

interface Props {
  elements: MoviesResult;
  type: 'movies' | 'tv-shows';
}

export default function ElementsPagination({ elements }: Props) {
  const [page, setPage] = useState<number>(1);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-10">
        {elements.results.map((element) => (
          <Element
            key={element.id}
            id={element.id}
            image={element.poster_path}
            title={element.title}
            width={250}
            height={250 * 1.5}
            type={'movies'}
            writeText={true}
            text={`${element.title} ${
              element.release_date &&
              '(' + element.release_date.slice(0, 4) + ')'
            }`}
          />
        ))}
      </div>
      <Pagination>
        <PaginationContent>
          {page > 1 && (
            <>
              <PaginationItem>
                <PaginationPrevious onClick={() => setPage(page - 1)} />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink onClick={() => setPage(1)}>1</PaginationLink>
              </PaginationItem>
              {page > 3 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              {page > 2 && (
                <PaginationItem>
                  <PaginationLink onClick={() => setPage(page - 1)}>
                    {page - 1}
                  </PaginationLink>
                </PaginationItem>
              )}
            </>
          )}
          <PaginationItem>
            <PaginationLink isActive>{page}</PaginationLink>
          </PaginationItem>
          {page < elements.total_pages && (
            <>
              {page + 1 < elements.total_pages && (
                <PaginationItem>
                  <PaginationLink onClick={() => setPage(page + 1)}>
                    {page + 1}
                  </PaginationLink>
                </PaginationItem>
              )}
              {page + 2 < elements.total_pages && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationLink onClick={() => setPage(elements.total_pages)}>
                  {elements.total_pages}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext onClick={() => setPage(page + 1)} />
              </PaginationItem>
            </>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
