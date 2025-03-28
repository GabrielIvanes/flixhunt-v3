'use client';

import { CiImageOff } from 'react-icons/ci';
import { usePathname, useRouter } from 'next/navigation';
import TmdbImage from '../ui/tmdb-image';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { P } from '../ui/typography';
import { CSSProperties } from 'react';

interface Props {
  id: number;
  image: string;
  imageClassname?: string;
  imageStyle?: CSSProperties;
  imagePriority?: boolean;
  imageFill?: boolean;
  title: string;
  width: number;
  height: number;
  type: 'movies' | 'tv-shows' | 'cast' | 'crew' | 'seasons' | 'episodes';
  additionalInformation?: string;
  text?: string;
  writeText?: boolean;
}

export default function Element({
  id,
  image,
  imageClassname,
  imageStyle,
  imagePriority = false,
  imageFill = false,
  title,
  width,
  height,
  type,
  writeText = false,
  text,
  additionalInformation,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const tvShowId = pathname.split('/')[2];
  const seasonNumber = pathname.split('/')[4];
  return (
    <div
      className={`flex flex-col items-center cursor-pointer`}
      style={{ width: `${width}px`, maxWidth: `${width}px` }}
      onClick={() =>
        router.push(
          type === 'seasons'
            ? `${tvShowId}/seasons/${id}`
            : type === 'episodes'
            ? `${seasonNumber}/episodes/${id}`
            : type === 'cast' || type === 'crew'
            ? `/persons/${id}`
            : `/${type}/${id}`
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
                  height={height}
                  style={imageStyle}
                  className={imageClassname}
                  priority={imagePriority}
                  fill={imageFill}
                />
              ) : (
                <div
                  className="bg-card flex flex-col justify-center items-center px-2"
                  style={{
                    width: `${width}px`,
                    height: `${height}px`,
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
          height={height}
          style={imageStyle}
          className={imageClassname}
          priority={imagePriority}
          fill={imageFill}
        />
      ) : (
        <div
          className="bg-card flex flex-col justify-center items-center px-2"
          style={{
            width: `${width}px`,
            height: `${height}px`,
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
      {writeText && text && <P text={text} classname="text-center" />}
    </div>
  );
}
