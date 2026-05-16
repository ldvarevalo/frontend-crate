import type { FunctionComponent } from 'react';
import { Typography } from '#/components/ui/typography';
import { cn } from '#/lib/utils';

/**
 * Types
 */

interface TrackRowProps {
  title: string;
  artist: string;
  duration: string;
  isActive?: boolean;
  onClick: () => void;
}

/**
 * TrackRow
 */

export const TrackRow: FunctionComponent<TrackRowProps> = ({
  title,
  artist,
  duration,
  isActive = false,
  onClick,
}) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      'flex w-full items-center justify-between px-3 py-2.5 text-left transition-colors',
      isActive ? 'bg-secondary' : 'hover:bg-secondary/50',
    )}
  >
    <div className="flex min-w-0 flex-col gap-0.5">
      <Typography size="sm" className="truncate">
        {title}
      </Typography>
      <Typography size="xs" className="truncate">
        {artist}
      </Typography>
    </div>
    <Typography size="xs" className="flex-shrink-0">
      {duration}
    </Typography>
  </button>
);
