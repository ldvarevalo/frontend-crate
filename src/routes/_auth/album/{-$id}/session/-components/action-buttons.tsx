import type { FunctionComponent } from 'react';
import { Typography } from '#/components/ui/typography';
import { cn } from '#/lib/utils';

/**
 * Types
 */

interface ActionButtonsProps {
  isValid: boolean;
  isPending: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

/**
 * ActionButtons
 */

export const ActionButtons: FunctionComponent<ActionButtonsProps> = ({
  isValid,
  isPending,
  onSubmit,
  onCancel,
}) => (
  <div className="flex flex-col gap-3 px-4 pb-8">
    <button
      type="button"
      disabled={!isValid || isPending}
      onClick={onSubmit}
      className={cn(
        'w-full bg-gradient-to-br from-primary-container/80 to-primary-container py-4 text-center transition-opacity',
        (!isValid || isPending) && 'opacity-50'
      )}
    >
      <Typography
        size="sm"
        weight="bold"
        transform="uppercase"
        tracking="widest"
        className="text-on-primary-container"
      >
        {isPending ? 'SAVING...' : 'NEW SESSION'}
      </Typography>
    </button>

    <button
      type="button"
      onClick={onCancel}
      className="w-full bg-transparent py-4 text-center"
    >
      <Typography
        size="sm"
        weight="bold"
        transform="uppercase"
        tracking="widest"
        className="text-on-surface-variant"
      >
        CANCEL
      </Typography>
    </button>
  </div>
);
