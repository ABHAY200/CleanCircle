import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TEXT } from '@/constants/text';
import { cn } from '@/utils';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({ page, totalPages, onPageChange, className }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
    if (totalPages <= 5) return i + 1;
    if (page <= 3) return i + 1;
    if (page >= totalPages - 2) return totalPages - 4 + i;
    return page - 2 + i;
  });

  return (
    <div className={cn('flex flex-wrap items-center justify-center gap-1 sm:gap-2', className)}>
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="flex items-center gap-1 rounded-lg px-2 sm:px-3 py-2 text-sm font-medium text-text-muted hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="hidden sm:inline">{TEXT.COMMON.PREVIOUS}</span>
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={cn(
            'h-9 w-9 rounded-lg text-sm font-medium transition-colors',
            p === page ? 'bg-primary text-white' : 'text-text-muted hover:bg-gray-100'
          )}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-text-muted hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <span className="hidden sm:inline">{TEXT.COMMON.NEXT}</span>
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
