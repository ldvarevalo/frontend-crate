import { type ChangeEvent, type FunctionComponent } from 'react';
import { Typography } from '#/components/ui/typography';

/**
 * Types
 */

interface DurationInputProps {
  value: string;
  onChange: (value: string) => void;
}

/**
 * Helpers
 */

const formatDuration = (digits: string): string => {
  const padded = digits.padStart(6, '0');

  return `${padded.slice(0, 2)}:${padded.slice(2, 4)}:${padded.slice(4, 6)}`;
};

/**
 * DurationInput
 */

export const DurationInput: FunctionComponent<DurationInputProps> = ({
  value,
  onChange,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const digits = e.target.value.replace(/\D/g, '').slice(-6);
    onChange(digits);
  };

  return (
    <div>
      <input
        type="text"
        inputMode="numeric"
        value={value ? formatDuration(value) : ''}
        onChange={handleChange}
        placeholder="00:43:57"
        className="w-full border-b-2 border-primary-container bg-transparent py-2 text-center font-mono text-4xl text-foreground outline-none placeholder:text-on-surface-variant/50"
      />
      <Typography
        size="xs"
        weight="bold"
        transform="uppercase"
        tracking="widest"
        className="mt-1 text-center text-on-surface-variant"
      >
        Optional: HH:MM:SS
      </Typography>
    </div>
  );
};
