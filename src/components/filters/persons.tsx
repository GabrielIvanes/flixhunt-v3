'use client';

import { getPersons } from '@/lib/global-functions';
import { Filters, PersonQuery } from '@/utils/global-interfaces';
import { useEffect, useState } from 'react';
import { H3, P } from '../ui/typography';
import { Switch } from '../ui/switch';
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

interface Props {
  personsIn: boolean;
  setPersonsInAction: React.Dispatch<React.SetStateAction<boolean>>;
  filters: Filters;
  setFiltersAction: React.Dispatch<React.SetStateAction<Filters>>;
}

export default function PersonsFilter({
  personsIn,
  setPersonsInAction,
  filters,
  setFiltersAction,
}: Props) {
  const [openPersons, setOpenPersons] = useState<boolean>(false);
  const [personsQuery, setPersonsQuery] = useState('');
  const [persons, setPersons] = useState<PersonQuery[]>([]);

  useEffect(() => {
    const fetchPersons = async () => {
      if (personsQuery !== '') {
        const p = (await getPersons(personsQuery)).results;
        setPersons(p);
      } else {
        setPersons([]);
      }
    };

    fetchPersons();
  }, [personsQuery]);
  return (
    <>
      <H3 text="Persons" classname="mt-5 mb-4" />
      <div className="flex items-center space-x-2 mb-2">
        <Switch checked={personsIn} onCheckedChange={setPersonsInAction} />
        <P text={'Persons in same movies'} />
      </div>

      <div>
        <Popover open={openPersons} onOpenChange={setOpenPersons}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openPersons}
              className="w-fit max-w-[400px] justify-between"
            >
              {filters.persons && filters.persons.length > 0
                ? `${filters.persons.length} person${
                    filters.persons.length > 1 ? 's' : ''
                  } selected`
                : 'Select persons'}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-fit p-0">
            <Command>
              <CommandInput
                placeholder="Search persons..."
                value={personsQuery}
                onValueChange={setPersonsQuery}
              />
              <CommandList>
                <CommandEmpty>No persons found.</CommandEmpty>
                <CommandGroup>
                  {filters.persons?.map((person) => (
                    <CommandItem
                      key={person.id}
                      onSelect={() => {
                        setFiltersAction((prevFilters) => ({
                          ...prevFilters,
                          persons:
                            prevFilters.persons &&
                            prevFilters.persons.length > 1
                              ? prevFilters.persons.filter((p) => {
                                  console.log();
                                  console.log(p.id);
                                  console.log(person.id);
                                  return p.id !== person.id;
                                })
                              : undefined,
                        }));
                        setOpenPersons(false);
                        setPersonsQuery('');
                        setPersons([]);
                      }}
                    >
                      {person.name}
                      <Check className={cn('ml-auto', 'opacity-100')} />
                    </CommandItem>
                  ))}
                  {persons.map((person) => {
                    const isSelected = filters.persons
                      ? filters.persons.some((p) => p.id === person.id)
                      : false;
                    return (
                      !isSelected && (
                        <CommandItem
                          key={person.id}
                          value={`${person.name}-${person.id}`}
                          onSelect={() => {
                            setFiltersAction((prevFilters) => ({
                              ...prevFilters,
                              persons: prevFilters.persons
                                ? [...prevFilters.persons, person]
                                : [person],
                            }));
                            setOpenPersons(false);
                            setPersonsQuery('');
                            setPersons([]);
                          }}
                        >
                          {person.name}
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
