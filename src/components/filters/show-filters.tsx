import { Filters } from '@/utils/global-interfaces';
import { Badge } from '../ui/badge';

interface Props {
  filters: Filters;
  personsIn: boolean;
}

export default function ShowFilters({ filters, personsIn }: Props) {
  return (
    <>
      {filters.genres && (
        <Badge key="genres" className="mr-2">
          Genres: {filters.genres.map((genre) => genre.name).join(', ')}
        </Badge>
      )}
      {filters.persons && (
        <Badge key="persons" className="mr-2">
          Persons:{' '}
          {filters.persons
            .map((person) => person.name)
            .join(personsIn ? ' and ' : ' or ')}
        </Badge>
      )}
      {filters.providers && (
        <Badge key="providers" className="mr-2">
          Providers:{' '}
          {filters.providers
            .map((provider) => provider.provider_name)
            .join(', ')}
        </Badge>
      )}
      {filters.keywords && (
        <Badge key="keywords" className="mr-2">
          Keywords: {filters.keywords.map((keyword) => keyword.name).join(', ')}
        </Badge>
      )}
      {filters.dateGte && (
        <Badge key="dateGte" className="mr-2">
          From: {filters.dateGte}
        </Badge>
      )}
      {filters.dateLte && (
        <Badge key="dateLte" className="mr-2">
          To: {filters.dateLte}
        </Badge>
      )}
      {filters.voteGte && (
        <Badge key="voteGte" className="mr-2">
          Min Vote: {filters.voteGte}
        </Badge>
      )}
      {filters.rateGte && (
        <Badge key="rateGte" className="mr-2">
          Min Rate: {filters.rateGte}
        </Badge>
      )}
      {filters.rateLte && (
        <Badge key="voteLte" className="mr-2">
          Max Rate: {filters.rateLte}
        </Badge>
      )}
    </>
  );
}
