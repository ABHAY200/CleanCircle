import { Heart } from 'lucide-react';
import { TEXT } from '@/constants/text';
import { ROUTES } from '@/constants/routes';
import { CleanerCard } from '@/components/cards/CleanerCard';
import { EmptyState } from '@/components/feedback/EmptyState';
import { useAppSelector } from '@/redux/hooks';
import { selectFavoriteCleanerIds } from '@/redux/customer/customerSlice';
import { cleaners } from '@/data';

export function CustomerFavorites() {
  const favoriteIds = useAppSelector(selectFavoriteCleanerIds);
  const favoriteCleaners = cleaners.filter((c) => favoriteIds.includes(c.id));

  return (
    <div>
      <h1 className="text-2xl font-bold text-text">{TEXT.CUSTOMER.FAVORITES.TITLE}</h1>
      <p className="text-text-muted mt-1">{TEXT.CUSTOMER.FAVORITES.SUBTITLE}</p>

      {favoriteCleaners.length === 0 ? (
        <EmptyState
          icon={Heart}
          title={TEXT.CUSTOMER.FAVORITES.EMPTY}
          actionLabel={TEXT.CUSTOMER.ENQUIRIES.BROWSE}
          onAction={() => window.location.href = ROUTES.SEARCH}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {favoriteCleaners.map((c) => (
            <CleanerCard key={c.id} cleaner={c} showFavorite />
          ))}
        </div>
      )}
    </div>
  );
}
