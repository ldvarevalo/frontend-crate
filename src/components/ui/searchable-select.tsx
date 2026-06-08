import type { FunctionComponent } from 'react';
import { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '#/lib/utils';
import type { LookupResult } from '#/repositories/types';
import { buttonVariants } from './button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './popover';

/** Types */

interface SearchableSelectProps {
  value: string;
  placeholder: string;
  results: LookupResult[];
  isSearching: boolean;
  onSearch: (query: string) => void;
  onChange: (value: string) => void;
  disabled?: boolean;
}

/** SearchableSelect */

export const SearchableSelect: FunctionComponent<SearchableSelectProps> = ({
  value,
  placeholder,
  results,
  isSearching,
  onSearch,
  onChange,
  disabled = false,
}) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleSelect = (selectedValue: string): void => {
    onChange(selectedValue);
    setOpen(false);
    setInputValue('');
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        role="combobox"
        aria-expanded={open}
        disabled={disabled}
        className={cn(
          buttonVariants({ variant: 'outline' }),
          'w-full justify-between'
        )}
      >
        {value || placeholder}
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={placeholder}
            value={inputValue}
            onValueChange={(q) => {
              setInputValue(q);
              onSearch(q);
            }}
          />
          <CommandList>
            {isSearching && (
              <CommandItem disabled>Searching...</CommandItem>
            )}
            {!isSearching && results.length === 0 && inputValue.length >= 2 && (
              <CommandItem
                onSelect={() => handleSelect(inputValue)}
              >
                Create &ldquo;{inputValue}&rdquo;
              </CommandItem>
            )}
            {!isSearching && results.length === 0 && inputValue.length < 2 && (
              <CommandEmpty>Type at least 2 characters</CommandEmpty>
            )}
            <CommandGroup>
              {results.map((result) => (
                <CommandItem
                  key={result.id}
                  value={result.name}
                  onSelect={() => handleSelect(result.name)}
                >
                  <Check
                    className={`mr-2 h-4 w-4 ${
                      value === result.name ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                  {result.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
