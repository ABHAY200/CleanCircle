import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, CheckCircle, Heart } from 'lucide-react';
import type { Cleaner } from '@/types';
import { RatingStars } from '@/components/feedback/RatingStars';
import { Badge } from '@/components/common/Badge';
import { buildRoute } from '@/constants/routes';
import { TEXT } from '@/constants/text';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { toggleFavorite, selectIsFavorite } from '@/redux/customer/customerSlice';
import { addToast } from '@/redux/ui/uiSlice';
import { AppImage } from '@/components/common/AppImage';
import { cn } from '@/utils';

interface CleanerCardProps {
  cleaner: Cleaner;
  showFavorite?: boolean;
  className?: string;
}

export function CleanerCard({ cleaner, showFavorite = false, className }: CleanerCardProps) {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector(selectIsFavorite(cleaner.id));

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(toggleFavorite(cleaner.id));
    dispatch(addToast({
      type: 'success',
      message: isFavorite ? TEXT.TOAST.FAVORITE_REMOVED : TEXT.TOAST.FAVORITE_ADDED,
    }));
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={cn('group rounded-2xl bg-white shadow-sm border border-border overflow-hidden hover:shadow-lg transition-shadow', className)}
    >
      <Link to={buildRoute.cleanerProfile(cleaner.id)} className="block relative bg-gray-200">
        <AppImage src={cleaner.banner} alt={cleaner.businessName} showIconOnError className="h-28 w-full object-cover" />
        {cleaner.isFeatured && (
          <Badge variant="info" className="absolute top-3 left-3">Featured</Badge>
        )}
        {showFavorite && (
          <button
            onClick={handleFavorite}
            className="absolute top-3 right-3 rounded-full bg-white/90 p-2 shadow-sm hover:bg-white transition-colors"
          >
            <Heart className={cn('h-4 w-4', isFavorite ? 'fill-danger text-danger' : 'text-text-muted')} />
          </button>
        )}
      </Link>
      <div className="px-4 pb-4 -mt-8 relative">
        <Link to={buildRoute.cleanerProfile(cleaner.id)}>
          <AppImage
            src={cleaner.avatar}
            alt={cleaner.businessName}
            className="h-16 w-16 rounded-full border-4 border-white object-cover shadow-sm"
          />
        </Link>
        <div className="mt-3">
          <div className="flex items-center gap-2">
            <Link to={buildRoute.cleanerProfile(cleaner.id)}>
              <h3 className="font-semibold text-text hover:text-primary transition-colors">{cleaner.businessName}</h3>
            </Link>
            {cleaner.isVerified && <CheckCircle className="h-4 w-4 text-primary shrink-0" />}
          </div>
          <div className="flex items-center gap-1 mt-1 text-sm text-text-muted">
            <MapPin className="h-3.5 w-3.5" />
            {cleaner.location.city}, {cleaner.location.province}
          </div>
          <div className="mt-2">
            <RatingStars rating={cleaner.rating} size="sm" showValue reviewCount={cleaner.reviewCount} />
          </div>
          <p className="text-sm text-text-muted mt-2 line-clamp-2">{cleaner.description}</p>
          <div className="flex items-center gap-3 mt-3 text-xs text-text-muted">
            <span>{cleaner.experience}+ {TEXT.COMMON.YEARS}</span>
            <span>•</span>
            <span>{cleaner.jobsCompleted} jobs</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
