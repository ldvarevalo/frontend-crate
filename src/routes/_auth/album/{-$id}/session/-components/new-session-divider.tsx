import type { FunctionComponent } from 'react';
import { Typography } from '#/components/ui/typography';

/**
 * NewSessionDivider
 */

export const NewSessionDivider: FunctionComponent = () => (
  <div className="flex items-center gap-3 px-4">
    <div className="h-px flex-1 bg-outline/15" />
    <Typography
      family="heading"
      size="sm"
      className="italic text-on-surface-variant"
    >
      New Session
    </Typography>
    <div className="h-px flex-1 bg-outline/15" />
  </div>
);
