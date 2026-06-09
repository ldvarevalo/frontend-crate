import type { FunctionComponent } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '#/components/ui/button';
import { Typography } from '#/components/ui/typography';

/**
 * AlbumRating
 */

export const AlbumRating: FunctionComponent = () => (
  <Button
    variant="text"
    className="flex w-full items-center justify-center gap-2 border border-dashed border-outline py-6"
  >
    <div className="flex flex-col items-center gap-1">
      <Plus className="size-5 text-on-surface-variant" />
      <Typography
        size="xs"
        transform="uppercase"
        className="text-on-surface-variant"
      >
        ADD RATING
      </Typography>
    </div>
  </Button>
);
