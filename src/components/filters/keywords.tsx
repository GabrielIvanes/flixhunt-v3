'use client';

import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { Filters, Keyword } from '@/utils/global-interfaces';
import { getKeywords } from '@/lib/global-functions';
import { H3 } from '../ui/typography';

interface Props {
  filters: Filters;
  setFiltersAction: React.Dispatch<React.SetStateAction<Filters>>;
}

export default function KeywordsFilter({ filters, setFiltersAction }: Props) {
  const [openKeywords, setOpenKeywords] = useState<boolean>(false);
  const [keywordsQuery, setKeywordsQuery] = useState('');
  const [keywords, setKeywords] = useState<Keyword[]>([]);

  useEffect(() => {
    const fetchKeywords = async () => {
      if (keywordsQuery !== '') {
        const k = (await getKeywords(keywordsQuery)).results;
        setKeywords(k);
      } else {
        setKeywords([]);
      }
    };

    fetchKeywords();
  }, [keywordsQuery]);

  return (
    <>
      <H3 text="Keywords" classname="mt-5 mb-4" />
      <div>
        <Popover open={openKeywords} onOpenChange={setOpenKeywords}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openKeywords}
              className="w-fit max-w-[400px] justify-between"
            >
              {filters.keywords && filters.keywords.length > 0
                ? `${filters.keywords.length} keyword${
                    filters.keywords.length > 1 ? 's' : ''
                  } selected`
                : 'Select keywords'}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-fit p-0">
            <Command>
              <CommandInput
                placeholder="Search keywords..."
                value={keywordsQuery}
                onValueChange={setKeywordsQuery}
              />
              <CommandList>
                <CommandEmpty>No keywords found.</CommandEmpty>
                <CommandGroup>
                  {filters.keywords?.map((keyword) => (
                    <CommandItem
                      key={keyword.id}
                      onSelect={() => {
                        setFiltersAction((prevFilters) => ({
                          ...prevFilters,
                          keywords:
                            prevFilters.keywords &&
                            prevFilters.keywords.length > 1
                              ? prevFilters.keywords.filter(
                                  (k) => k.id !== keyword.id
                                )
                              : undefined,
                        }));
                        setOpenKeywords(false);
                        setKeywordsQuery('');
                        setKeywords([]);
                      }}
                    >
                      {keyword.name}
                      <Check className={cn('ml-auto', 'opacity-100')} />
                    </CommandItem>
                  ))}
                  {keywords.map((keyword) => {
                    const isSelected = filters.keywords
                      ? filters.keywords.some((k) => k.id === keyword.id)
                      : false;
                    return (
                      !isSelected && (
                        <CommandItem
                          key={keyword.id}
                          value={`${keyword.name}-${keyword.id}`}
                          onSelect={() => {
                            setFiltersAction((prevFilters) => ({
                              ...prevFilters,
                              keywords: prevFilters.keywords
                                ? [...prevFilters.keywords, keyword]
                                : [keyword],
                            }));
                            setOpenKeywords(false);
                            setKeywordsQuery('');
                            setKeywords([]);
                          }}
                        >
                          {keyword.name}
                          <Check className={cn('ml-auto', 'opacity-0')} />
                        </CommandItem>
                      )
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}
