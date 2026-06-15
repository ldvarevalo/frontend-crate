import type { FunctionComponent } from 'react';
import { Typography } from '#/components/ui/typography';
import { cn } from '#/lib/utils';
import type { SourceFormat } from '#/types/domain';

/**
 * Types
 */

interface SourceFormatCardsProps {
  value: SourceFormat;
  onChange: (format: SourceFormat) => void;
}

/**
 * Constants
 */

const FORMATS: { key: SourceFormat; label: string; icon: string }[] = [
  {
    key: 'vinyl',
    label: 'Vinyl',
    icon: '💿',
  },
  {
    key: 'digital',
    label: 'Digital',
    icon: '🎵',
  },
];

/**
 * SourceFormatCards
 */

export const SourceFormatCards: FunctionComponent<SourceFormatCardsProps> = ({
  value,
  onChange,
}) => (
  <div className="grid grid-cols-2 gap-3">
    {FORMATS.map(({ key, label, icon }) => {
      const isActive = key === value;

      return (
        <button
          key={key}
          type="button"
          onClick={() => onChange(key)}
          className={cn(
            'flex flex-col items-center gap-3 px-6 py-8 transition-colors',
            isActive ? 'bg-primary-container' : 'bg-surface-container-high'
          )}
        >
          <span
            className={cn(
              'text-2xl',
              isActive ? 'text-on-primary-container' : 'text-on-surface-variant'
            )}
          >
            {icon}
          </span>
          <Typography
            size="xs"
            weight="bold"
            transform="uppercase"
            tracking="widest"
            className={
              isActive ? 'text-on-primary-container' : 'text-on-surface-variant'
            }
          >
            {label}
          </Typography>
        </button>
      );
    })}
  </div>
);
