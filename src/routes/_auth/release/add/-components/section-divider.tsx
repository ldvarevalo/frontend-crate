import type { FunctionComponent } from 'react';
import { Typography } from '#/components/ui/typography';

/**
 * Types
 */

interface SectionDividerProps {
  label: string;
}

/**
 * SectionDivider
 */

export const SectionDivider: FunctionComponent<SectionDividerProps> = ({ label }) => (
  <div className="flex items-center gap-3">
    <div className="h-px flex-1 bg-outline/15" />
    <Typography
      size="xs"
      weight="medium"
      tracking="widest"
      transform="uppercase"
      className="shrink-0 text-on-surface-variant"
    >
      {label}
    </Typography>
    <div className="h-px flex-1 bg-outline/15" />
  </div>
);
