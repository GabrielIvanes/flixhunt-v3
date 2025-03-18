'use client';

import { CiImageOff } from 'react-icons/ci';
import { redirect } from 'next/navigation';
import TmdbImage from '../ui/tmdb-image';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { P } from '../ui/typography';

interface Props {
  id: number;
  image: string;
  title: string;
  width: number;
  type: 'movies' | 'tv-shows' | 'cast' | 'crew';
  additionalInformation?: string;
  writeTitle?: boolean;
}

export default function Element({
  id,
  image,
  title,
  width,
  type,
  writeTitle = false,
  additionalInformation,
}: Props) {
  return (
    <div
      className={`flex flex-col items-center cursor-pointer`}
      style={{ width: `${width}px`, maxWidth: `${width}px` }}
      onClick={() =>
        redirect(
          `/${type == 'crew' || type == 'cast' ? 'persons' : type}/${id}`
        )
      }
    >
      {additionalInformation ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              {image ? (
                <TmdbImage
                  image={image}
                  title={title}
                  width={width}
                  height={width * 1.5}
                  style={{
                    borderRadius: 'var(--radius)',
                  }}
                />
              ) : (
                <div
                  className="bg-card flex flex-col justify-center items-center px-2"
                  style={{
                    width: `${width}px`,
                    height: `${width * 1.5}px`,
                    borderRadius: 'var(--radius)',
                  }}
                >
                  <div className="text-center">{title}</div>
                  <CiImageOff
                    style={{
                      width: `${width / 2}px`,
                      height: `${width / 2}px`,
                    }}
                  />
                </div>
              )}
            </TooltipTrigger>
            <TooltipContent>{additionalInformation}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : image ? (
        <TmdbImage
          image={image}
          title={title}
          width={width}
          height={width * 1.5}
          style={{
            borderRadius: 'var(--radius)',
          }}
        />
      ) : (
        <div
          className="bg-card flex flex-col justify-center items-center px-2"
          style={{
            width: `${width}px`,
            height: `${width * 1.5}px`,
            borderRadius: 'var(--radius)',
          }}
        >
          <div className="text-center">{title}</div>
          <CiImageOff
            style={{
              width: `${width / 2}px`,
              height: `${width / 2}px`,
            }}
          />
        </div>
      )}
      {writeTitle && <P text={title} />}
    </div>
  );
}
