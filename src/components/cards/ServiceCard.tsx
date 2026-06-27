import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Clock } from 'lucide-react';
import type { Service } from '@/types';
import { RatingStars } from '@/components/feedback/RatingStars';
import { Badge } from '@/components/common/Badge';
import { buildRoute } from '@/constants/routes';
import { IMAGES } from '@/constants/images';
import { formatPrice, cn } from '@/utils';
import { AppImage } from '@/components/common/AppImage';

interface ServiceCardProps {
  service: Service;
  viewMode?: 'grid' | 'list';
  className?: string;
}

export function ServiceCard({ service, viewMode = 'grid', className }: ServiceCardProps) {
  const image = service.images[0] ?? IMAGES.DEFAULT_SERVICE;

  if (viewMode === 'list') {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        className={cn('flex flex-col sm:flex-row gap-4 rounded-2xl bg-white p-4 shadow-sm border border-border hover:shadow-md transition-shadow', className)}
      >
        <Link to={buildRoute.serviceDetails(service.id)} className="shrink-0 w-full sm:w-auto bg-gray-200 rounded-xl overflow-hidden">
          <AppImage src={image} alt={service.title} showIconOnError className="h-40 sm:h-32 w-full sm:w-48 object-cover" />
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4">
            <div className="min-w-0">
              <Link to={buildRoute.serviceDetails(service.id)}>
                <h3 className="font-semibold text-text hover:text-primary transition-colors">{service.title}</h3>
              </Link>
              <p className="text-sm text-text-muted mt-1 line-clamp-2">{service.shortDescription}</p>
            </div>
            <p className="text-lg font-bold text-primary shrink-0">
              {formatPrice(service.price, service.priceType)}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-3">
            <RatingStars rating={service.rating} size="sm" showValue reviewCount={service.reviewCount} />
            <span className="flex items-center gap-1 text-sm text-text-muted">
              <MapPin className="h-3.5 w-3.5" />
              {service.location.city}, {service.location.province}
            </span>
            <span className="flex items-center gap-1 text-sm text-text-muted">
              <Clock className="h-3.5 w-3.5" />
              {service.duration}h
            </span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={cn('group rounded-2xl bg-white shadow-sm border border-border overflow-hidden hover:shadow-lg transition-shadow', className)}
    >
      <Link to={buildRoute.serviceDetails(service.id)} className="block relative bg-gray-200">
        <AppImage src={image} alt={service.title} showIconOnError className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300" />
        {service.isFeatured && (
          <Badge variant="info" className="absolute top-3 left-3">Featured</Badge>
        )}
      </Link>
      <div className="p-4">
        <Link to={buildRoute.serviceDetails(service.id)}>
          <h3 className="font-semibold text-text hover:text-primary transition-colors line-clamp-1">{service.title}</h3>
        </Link>
        <p className="text-sm text-text-muted mt-1 line-clamp-2">{service.shortDescription}</p>
        <div className="flex items-center gap-1 mt-2 text-sm text-text-muted">
          <MapPin className="h-3.5 w-3.5" />
          {service.location.city}, {service.location.province}
        </div>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
          <RatingStars rating={service.rating} size="sm" showValue />
          <span className="text-lg font-bold text-primary">
            {formatPrice(service.price, service.priceType)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
