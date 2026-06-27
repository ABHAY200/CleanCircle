import { Star } from 'lucide-react';
import { TEXT } from '@/constants/text';
import { ReviewCard } from '@/components/cards/ReviewCard';
import { RatingStars } from '@/components/feedback/RatingStars';
import { EmptyState } from '@/components/feedback/EmptyState';
import { useAppSelector } from '@/redux/hooks';
import { selectCleanerProfile } from '@/redux/cleaner/cleanerSlice';
import { selectCleanerReviews } from '@/redux/reviews/reviewsSlice';

export function CleanerReviews() {
  const profile = useAppSelector(selectCleanerProfile);
  const reviews = useAppSelector(selectCleanerReviews(profile?.id ?? ''));

  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
    percentage: reviews.length ? (reviews.filter((r) => r.rating === star).length / reviews.length) * 100 : 0,
  }));

  return (
    <div>
      <h1 className="text-2xl font-bold text-text">{TEXT.CLEANER.REVIEWS.TITLE}</h1>
      <p className="text-text-muted mt-1">{TEXT.CLEANER.REVIEWS.SUBTITLE}</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="rounded-2xl border border-border bg-white p-6">
          <h2 className="text-lg font-semibold mb-4">{TEXT.CLEANER.REVIEWS.ANALYTICS}</h2>
          <div className="text-center mb-6">
            <p className="text-4xl font-bold text-text">{profile?.rating ?? 0}</p>
            <RatingStars rating={profile?.rating ?? 0} size="lg" className="justify-center mt-2" />
            <p className="text-sm text-text-muted mt-1">{reviews.length} reviews</p>
          </div>
          <div className="space-y-2">
            {ratingDistribution.map(({ star, count, percentage }) => (
              <div key={star} className="flex items-center gap-2 text-sm">
                <span className="w-3">{star}</span>
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: `${percentage}%` }} />
                </div>
                <span className="text-text-muted w-6 text-right">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {reviews.length === 0 ? (
            <EmptyState icon={Star} title={TEXT.CLEANER.REVIEWS.EMPTY} />
          ) : (
            reviews.map((r) => <ReviewCard key={r.id} review={r} />)
          )}
        </div>
      </div>
    </div>
  );
}
