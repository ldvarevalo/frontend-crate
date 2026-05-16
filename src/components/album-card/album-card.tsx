import type { FunctionComponent } from 'react';
import { Typography } from '#/components/ui/typography';

/**
 * Types
 */

interface AlbumCardProps {
  coverUrl: string;
  title: string;
  artist: string;
  onClick: () => void;
}

/**
 * AlbumCard
 */

export const AlbumCard: FunctionComponent<AlbumCardProps> = ({
  coverUrl,
  title,
  artist,
  onClick,
}) => (
  <button
    type="button"
    onClick={onClick}
    className="flex flex-col items-start gap-1.5 text-left transition-opacity hover:opacity-80"
  >
    <div className="aspect-square w-full overflow-hidden bg-muted">
      <img
        src={coverUrl}
        alt={title}
        className="h-full w-full object-cover"
      />
    </div>
    <Typography family="heading" size="sm">
      {title}
    </Typography>
    <Typography size="xs">
      {artist}
    </Typography>
  </button>
);
