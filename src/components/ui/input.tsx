import * as React from 'react';
import { Input as InputPrimitive } from '@base-ui/react/input';
import { cn } from '#/lib/utils';

const Input = ({
  className,
  type,
  ...props
}: React.ComponentProps<'input'>): React.ReactElement => (
  <InputPrimitive
    type={type}
    data-slot="input"
    className={cn(
      'w-full h-16 bg-surface-container-lowest border-none border-b-2 border-transparent focus:border-primary focus:ring-0 px-12 text-on-surface font-label uppercase tracking-widest text-sm transition-all placeholder:text-gray-500',
      className
    )}
    {...props}
  />
);

export { Input };
