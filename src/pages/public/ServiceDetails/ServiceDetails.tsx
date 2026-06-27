import { useParams, Link } from 'react-router-dom';
import { MapPin, Clock, CheckCircle, MessageSquare, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { TEXT } from '@/constants/text';
import { buildRoute } from '@/constants/routes';
import { ImageGallery } from '@/components/common/ImageGallery';
import { RatingStars } from '@/components/feedback/RatingStars';
import { ReviewCard } from '@/components/cards/ReviewCard';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { Button } from '@/components/buttons/Button';
import { Breadcrumb } from '@/components/navigation/Breadcrumb';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectServiceById, selectRelatedServices } from '@/redux/services/servicesSlice';
import { selectServiceReviews } from '@/redux/reviews/reviewsSlice';
import { openModal } from '@/redux/ui/uiSlice';
import { cleaners } from '@/data';
import { AppImage } from '@/components/common/AppImage';
import { formatPrice } from '@/utils';

export function ServiceDetails() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const service = useAppSelector(selectServiceById(id ?? ''));
  const reviews = useAppSelector(selectServiceReviews(id ?? ''));
  const related = useAppSelector(selectRelatedServices(id ?? '', service?.categoryId ?? ''));

  if (!service) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold">{TEXT.COMMON.NO_RESULTS}</h2>
      </div>
    );
  }

  const cleaner = cleaners.find((c) => c.id === service.cleanerId);

  const handleEnquiry = () => {
    dispatch(openModal({
      type: 'enquiry',
      data: { serviceId: service.id, cleanerId: service.cleanerId, serviceTitle: service.title },
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 lg:pb-8">
      <Breadcrumb items={[
        { label: 'Search', href: '/search' },
        { label: service.title },
      ]} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
        <div className="lg:col-span-2 space-y-8">
          <ImageGallery images={service.images} alt={service.title} />

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-2xl sm:text-3xl font-bold text-text">{service.title}</h1>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-3">
              <RatingStars rating={service.rating} showValue reviewCount={service.reviewCount} />
              <span className="flex items-center gap-1 text-sm text-text-muted">
                <MapPin className="h-4 w-4" />
                {service.location.city}, {service.location.province}
              </span>
            </div>
          </motion.div>

          <div>
            <h2 className="text-xl font-semibold mb-3">{TEXT.SERVICE_DETAILS.ABOUT}</h2>
            <p className="text-text-muted leading-relaxed">{service.description}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">{TEXT.SERVICE_DETAILS.FEATURES}</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm text-text-muted">
                  <CheckCircle className="h-4 w-4 text-success shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {cleaner && (
            <div className="rounded-2xl border border-border p-5">
              <h2 className="text-xl font-semibold mb-4">{TEXT.SERVICE_DETAILS.CLEANER_INFO}</h2>
              <Link to={buildRoute.cleanerProfile(cleaner.id)} className="flex items-center gap-4 group">
                <AppImage src={cleaner.avatar} alt={cleaner.businessName} className="h-16 w-16 rounded-full object-cover shrink-0" />
                <div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors">{cleaner.businessName}</h3>
                  <RatingStars rating={cleaner.rating} size="sm" showValue reviewCount={cleaner.reviewCount} />
                  <p className="text-sm text-text-muted mt-1">{cleaner.experience}+ years experience</p>
                </div>
              </Link>
            </div>
          )}

          <div>
            <h2 className="text-xl font-semibold mb-4">{TEXT.SERVICE_DETAILS.REVIEWS} ({reviews.length})</h2>
            <div className="space-y-4">
              {reviews.slice(0, 5).map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar booking card — desktop */}
        <div className="lg:col-span-1 hidden lg:block">
          <div className="sticky top-24 rounded-2xl border border-border bg-white p-6 shadow-sm">
            <div className="text-3xl font-bold text-primary mb-1">
              {formatPrice(service.price, service.priceType)}
            </div>
            <div className="flex items-center gap-4 text-sm text-text-muted mb-6">
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {service.duration} hours
              </span>
            </div>
            <div className="space-y-3">
              <Button fullWidth size="lg" onClick={handleEnquiry}>
                <Calendar className="h-5 w-5" />
                {TEXT.SERVICE_DETAILS.BOOK_SERVICE}
              </Button>
              <Button fullWidth variant="outline" size="lg">
                <MessageSquare className="h-5 w-5" />
                {TEXT.SERVICE_DETAILS.CONTACT_CLEANER}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky booking bar */}
      <div className="fixed bottom-0 inset-x-0 z-30 lg:hidden bg-white border-t border-border p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="flex items-center gap-3 max-w-7xl mx-auto">
          <div className="min-w-0 flex-1">
            <p className="text-lg font-bold text-primary">{formatPrice(service.price, service.priceType)}</p>
            <p className="text-xs text-text-muted">{service.duration} hours</p>
          </div>
          <Button size="lg" onClick={handleEnquiry} className="shrink-0">
            <Calendar className="h-5 w-5" />
            {TEXT.COMMON.BOOK_NOW}
          </Button>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">{TEXT.SERVICE_DETAILS.RELATED}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
