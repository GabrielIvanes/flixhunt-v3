'use client';

import {
  MediaCastCredit,
  CombinedCredits,
  MediaCrewCredit,
} from '@/utils/person-interfaces';
import { useMemo, useState } from 'react';

interface Props {
  knowForDepartment: string;
  combinedCredits: CombinedCredits;
}
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Element from '../elements/element';
import { filterCastCredit, filterCrew } from '@/lib/global-functions';
import { sortArray } from '@/lib/person-functions';
import { P } from '../ui/typography';

export default function Filmography({
  knowForDepartment,
  combinedCredits,
}: Props) {
  const [role, setRole] = useState<string>(
    knowForDepartment === 'Directing'
      ? 'director'
      : knowForDepartment === 'Acting'
      ? 'cast'
      : 'crew'
  );
  const [sortType, setSortType] = useState<string>('popularity-descending');

  const filteredMedia = useMemo(() => {
    let data: MediaCastCredit[] | MediaCrewCredit[] = [];

    if (role === 'cast') {
      data = filterCastCredit(combinedCredits.cast);
    } else if (role === 'crew') {
      data = filterCrew(combinedCredits) as MediaCrewCredit[];
    } else if (role === 'director') {
      data = combinedCredits.crew.filter((crew) => crew.job === 'Director');
    }

    return sortArray(sortType, data);
  }, [role, sortType, combinedCredits]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-5">
        <Select value={role} onValueChange={(value) => setRole(value)}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cast">Cast</SelectItem>
            <SelectItem value="crew">Crew</SelectItem>
            <SelectItem value="director">Director</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={sortType}
          onValueChange={(value) => {
            setSortType(value);
          }}
        >
          <SelectTrigger className="w-[210px]">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="year-descending">Year descending</SelectItem>
            <SelectItem value="year-ascending">Year ascending</SelectItem>
            <SelectItem value="popularity-descending">
              Popularity descending
            </SelectItem>
            <SelectItem value="popularity-ascending">
              Popularity ascending
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-wrap gap-5">
        {filteredMedia.length > 0 ? (
          filteredMedia.map((media) => (
            <Element
              key={media.id}
              id={media.id}
              image={media.poster_path}
              imageStyle={{
                borderRadius: 'var(--radius)',
              }}
              imageFill={true}
              title={media.title || media.id.toString()}
              width={250}
              height={250 * 1.5}
              type={media.media_type === 'movie' ? 'movies' : 'tv-shows'}
              additionalInformation={
                'character' in media
                  ? media.character
                  : (media as MediaCrewCredit).job
              }
              writeText={
                media.release_date != null || media.first_air_date != null
              }
              text={
                'release_date' in media && media.release_date
                  ? media.release_date.slice(0, 4)
                  : media.first_air_date && media.first_air_date.slice(0, 4)
              }
            />
          ))
        ) : (
          <P text="There is no media in this category." />
        )}
      </div>
    </div>
  );
}
