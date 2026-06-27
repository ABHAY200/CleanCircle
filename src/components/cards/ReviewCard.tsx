import { CheckCircle } from 'lucide-react';
import type { Review } from '@/types';
import { RatingStars } from '@/components/feedback/RatingStars';
import { formatDate } from '@/utils';
import { AppImage } from '@/components/common/AppImage';
import { customers } from '@/data';

interface ReviewCardProps {
  review: Review;
  className?: string;
}

export function ReviewCard({ review, className }: ReviewCardProps) {
  const customer = customers.find((c) => c.id === review.customerId);

  return (
    <div className={`rounded-2xl bg-white p-5 border border-border ${className ?? ''}`}>
      <div className="flex items-start gap-3">
        <AppImage
          src={customer?.avatar ?? ''}
          alt={customer ? `${customer.firstName} ${customer.lastName}` : 'Customer'}
          className="h-10 w-10 rounded-full object-cover shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="font-medium text-text text-sm">
                {customer ? `${customer.firstName} ${customer.lastName.charAt(0)}.` : 'Customer'}
              </span>
              {review.isVerified && <CheckCircle className="h-3.5 w-3.5 text-primary" />}
            </div>
            <span className="text-xs text-text-muted">{formatDate(review.createdAt)}</span>
          </div>
          <RatingStars rating={review.rating} size="sm" className="mt-1" />
          <p className="text-sm text-text-muted mt-2 leading-relaxed">{review.comment}</p>
        </div>
      </div>
    </div>
  );
}
