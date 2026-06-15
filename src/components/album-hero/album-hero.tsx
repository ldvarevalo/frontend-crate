import type { FunctionComponent } from 'react';
import { Typography } from '#/components/ui/typography';
import { cn } from '#/lib/utils';

/**
 * Types
 */

type HeroVariant = 'detail' | 'cover';

export interface AlbumHeroProps {
  coverUrl: string;
  title: string;
  artist: string;
  variant?: HeroVariant;
}

/**
 * AlbumHero
 */

export const AlbumHero: FunctionComponent<AlbumHeroProps> = ({
  coverUrl,
  title,
  artist,
  variant = 'detail',
}) => (
  <div className={cn('w-full', variant === 'detail' && 'relative')}>
    <div className="aspect-[4/3] w-full overflow-hidden">
      <img
        src={coverUrl}
        alt={title}
        className="h-full w-full object-cover object-center"
      />
    </div>
    {variant === 'detail' && (
      <>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 space-y-1 p-4">
          <Typography
            size="2xl"
            weight="bold"
            className="font-heading not-italic"
          >
            {title}
          </Typography>
          <Typography family="heading" size="md" className="text-primary">
            {artist}
          </Typography>
        </div>
      </>
    )}
    {variant === 'cover' && (
      <div className="flex flex-col items-center gap-1 px-4 pt-4">
        <Typography
          as="h1"
          family="heading"
          size="2xl"
          weight="bold"
          className="text-center text-foreground"
        >
          {title}
        </Typography>
        <Typography
          size="xs"
          weight="bold"
          transform="uppercase"
          tracking="widest"
          className="text-primary"
        >
          {artist}
        </Typography>
      </div>
    )}
  </div>
);
