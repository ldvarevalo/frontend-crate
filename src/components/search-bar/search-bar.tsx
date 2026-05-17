import type { ChangeEvent, FunctionComponent } from 'react';
import { Search } from 'lucide-react';
import { Input } from '#/components/ui/input';

/**
 * Types
 */

interface SearchBarProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

/**
 * SearchBar
 */

export const SearchBar: FunctionComponent<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search archive...',
}) => (
  <div className="relative">
    <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
    <Input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="pl-10"
    />
  </div>
);
