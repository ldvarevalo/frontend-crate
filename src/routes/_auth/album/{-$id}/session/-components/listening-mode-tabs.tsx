import type { FunctionComponent } from 'react';
import { Typography } from '#/components/ui/typography';
import { cn } from '#/lib/utils';
import type { ListeningScope } from '#/types/domain';

/**
 * Types
 */

interface ListeningModeTabsProps {
  modes: ListeningScope[];
  activeMode: ListeningScope;
  onChange: (mode: ListeningScope) => void;
}

/**
 * Constants
 */

const MODE_LABELS: Record<ListeningScope, string> = {
  full_release: 'Full Album',
  side_a: 'Side A',
  side_b: 'Side B',
  side_c: 'Side C',
  side_d: 'Side D',
};

/**
 * ListeningModeTabs
 */

export const ListeningModeTabs: FunctionComponent<ListeningModeTabsProps> = ({
  modes,
  activeMode,
  onChange,
}) => (
  <div className="flex flex-wrap gap-2">
    {modes.map(mode => {
      const isActive = mode === activeMode;

      return (
        <button
          key={mode}
          type="button"
          onClick={() => onChange(mode)}
          className={cn(
            'flex-1 basis-[calc(25%-0.5rem)] px-4 py-3 transition-colors',
            isActive
              ? 'bg-primary-container text-on-primary-container'
              : 'bg-surface-container-high text-on-surface-variant'
          )}
        >
          <Typography
            size="xs"
            weight="bold"
            transform="uppercase"
            className={
              isActive ? 'text-on-primary-container' : 'text-on-surface-variant'
            }
          >
            {MODE_LABELS[mode]}
          </Typography>
        </button>
      );
    })}
  </div>
);
