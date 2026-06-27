import { Star, StarHalf } from 'lucide-react';
import { cn } from '@/utils';

interface RatingStarsProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  reviewCount?: number;
  className?: string;
}

const sizes = {
  sm: 'h-3.5 w-3.5',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
};

export function RatingStars({ rating, size = 'md', showValue, reviewCount, className }: RatingStarsProps) {
  const full = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const empty = 5 - full - (hasHalf ? 1 : 0);

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex">
        {Array.from({ length: full }).map((_, i) => (
          <Star key={`full-${i}`} className={cn(sizes[size], 'fill-amber-400 text-amber-400')} />
        ))}
        {hasHalf && <StarHalf className={cn(sizes[size], 'fill-amber-400 text-amber-400')} />}
        {Array.from({ length: empty }).map((_, i) => (
          <Star key={`empty-${i}`} className={cn(sizes[size], 'text-gray-300')} />
        ))}
      </div>
      {showValue && (
        <span className="text-sm font-medium text-text">
          {rating.toFixed(1)}
          {reviewCount !== undefined && (
            <span className="text-text-muted font-normal"> ({reviewCount})</span>
          )}
        </span>
      )}
    </div>
  );
}
