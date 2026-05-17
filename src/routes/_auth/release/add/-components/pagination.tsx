import type { FunctionComponent } from 'react';
import { Button } from '#/components/ui/button';
import { cn } from '#/lib/utils';

/**
 * Types
 */

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/**
 * Pagination
 */

export const Pagination: FunctionComponent<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const pages: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-3">
      <Button
        variant="text"
        size="icon-xs"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ‹
      </Button>
      {pages.map((page) => (
        <Button
          key={page}
          variant="text"
          onClick={() => onPageChange(page)}
          className={cn(
            'min-w-6',
            page === currentPage
              ? 'font-bold text-on-surface underline decoration-2 underline-offset-4 decoration-primary'
              : 'text-on-surface-variant',
          )}
        >
          {page}
        </Button>
      ))}
      <Button
        variant="text"
        size="icon-xs"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        ›
      </Button>
    </div>
  );
};
