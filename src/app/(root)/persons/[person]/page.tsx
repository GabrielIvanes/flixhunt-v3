import Filmography from '@/components/filmography/filmography';
import TmdbImage from '@/components/ui/tmdb-image';
import { H1, H2, H3, H4, P } from '@/components/ui/typography';
import { getPerson, getPersonAge } from '@/lib/person-functions';

export default async function Person({
  params,
}: {
  params: Promise<{ person: string }>;
}) {
  const { person: id } = await params;
  const personDetails = await getPerson(id);
  console.log(personDetails);
  return (
    <div className="flex gap-20 min-h-[calc(100vh-4rem-2.5rem)] w-full mt-5 px-5">
      <div className="w-[330px] min-h-[calc(100vh-4rem-2.5rem)] flex flex-col">
        <TmdbImage
          image={personDetails.profile_path}
          title={personDetails.name}
          width={330}
          height={330 * 1.5}
          priority={true}
        />
        {(personDetails.known_for_department ||
          personDetails.birthday ||
          personDetails.place_of_birth) && (
          <H3 text="Personal information" classname="mt-5" />
        )}
        {personDetails.known_for_department && (
          <div>
            <H4 text="Know for department" classname="mb-1 mt-3" />
            <P text={personDetails.known_for_department} />
          </div>
        )}
        {personDetails.birthday && (
          <div>
            <H4 text="Date" classname="mb-1 mt-3" />
            <P
              text={`${personDetails.birthday} ${
                personDetails.deathday ? ` - ${personDetails.deathday}` : ''
              } (${getPersonAge(
                personDetails.birthday,
                personDetails.deathday
              )} years old)`}
            />
          </div>
        )}
        {personDetails.place_of_birth && (
          <div>
            <H4 text="Place of birth" classname="mb-1 mt-3" />
            <P text={personDetails.place_of_birth} />
          </div>
        )}
      </div>
      <div className="grow min-h-[calc(100vh-4rem-2.5rem)]">
        <H1 text={personDetails.name} />
        <H2 text="Biography" classname="mt-5" />
        <P text={personDetails.biography} />
        <H2 text="Filmography" classname="mt-5 mb-3" />
        <Filmography
          knowForDepartment={personDetails.known_for_department || 'crew'}
          combinedCredits={personDetails.combined_credits}
        />
      </div>
    </div>
  );
}
