import type { FunctionComponent } from 'react';
import { ImageIcon } from 'lucide-react';
import { Typography } from '#/components/ui/typography';

/**
 * Types
 */

interface ArtworkPreviewProps {
  imageUrl: string;
}

/**
 * ArtworkPreview
 */

export const ArtworkPreview: FunctionComponent<ArtworkPreviewProps> = ({ imageUrl }) => {
  const hasValidUrl = imageUrl.startsWith('http');

  if (hasValidUrl) {
    return (
      <div className="aspect-square w-full overflow-hidden">
        <img src={imageUrl} alt="Artwork preview" className="h-full w-full object-cover" />
      </div>
    );
  }

  return (
    <div className="flex aspect-square w-full flex-col items-center justify-center gap-1 border-2 border-dashed border-outline/15 bg-surface-container-lowest">
      <ImageIcon className="size-6 text-on-surface-variant" />
      <Typography size="2xs" weight="medium" tracking="wider" transform="uppercase" className="text-on-surface-variant">
        PREVIEW
      </Typography>
    </div>
  );
};
