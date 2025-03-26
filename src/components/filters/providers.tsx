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
import { useState } from 'react';
import { Filters, Providers } from '@/utils/global-interfaces';
import { H3 } from '../ui/typography';
import { cn } from '@/lib/utils';

interface Props {
  providers: Providers | undefined;
  filters: Filters;
  setFiltersAction: React.Dispatch<React.SetStateAction<Filters>>;
}

export default function ProvidersFilter({
  providers,
  filters,
  setFiltersAction,
}: Props) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    providers && (
      <>
        <H3 text="Providers" classname="mt-5 mb-4" />
        <div>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-fit max-w-[400px] justify-between"
              >
                {filters.providers && filters.providers.length > 0
                  ? `${filters.providers.length} provider${
                      filters.providers.length > 1 ? 's' : ''
                    } selected`
                  : 'Select providers'}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-fit p-0">
              <Command>
                <CommandInput placeholder="Search providers..." />
                <CommandList>
                  <CommandEmpty>No providers found.</CommandEmpty>
                  <CommandGroup>
                    {providers.results.map((provider) => {
                      const isSelected = filters.providers
                        ? filters.providers.some(
                            (p) => p.provider_id === provider.provider_id
                          )
                        : false;

                      return (
                        <CommandItem
                          key={provider.provider_id}
                          value={`${provider.provider_name}-${provider.provider_id}`}
                          onSelect={() => {
                            setFiltersAction((prevFilters) => ({
                              ...prevFilters,
                              providers: prevFilters.providers
                                ? isSelected
                                  ? prevFilters.providers.length > 1
                                    ? prevFilters.providers.filter(
                                        (p) =>
                                          p.provider_id !== provider.provider_id
                                      )
                                    : undefined
                                  : [
                                      ...prevFilters.providers,
                                      {
                                        logo_path: provider.logo_path,
                                        provider_id: provider.provider_id,
                                        provider_name: provider.provider_name,
                                        display_priority:
                                          provider.display_priority,
                                      },
                                    ]
                                : [
                                    {
                                      logo_path: provider.logo_path,
                                      provider_id: provider.provider_id,
                                      provider_name: provider.provider_name,
                                      display_priority:
                                        provider.display_priority,
                                    },
                                  ],
                            }));

                            setOpen(false);
                          }}
                        >
                          {provider.provider_name}
                          <Check
                            className={cn(
                              'ml-auto',
                              isSelected ? 'opacity-100' : 'opacity-0'
                            )}
                          />
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </>
    )
  );
}
