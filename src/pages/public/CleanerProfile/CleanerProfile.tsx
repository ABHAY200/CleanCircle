import { useParams } from 'react-router-dom';
import { MapPin, CheckCircle, Clock, Briefcase, MessageSquare, Calendar, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { TEXT } from '@/constants/text';
import { ImageGallery } from '@/components/common/ImageGallery';
import { RatingStars } from '@/components/feedback/RatingStars';
import { ReviewCard } from '@/components/cards/ReviewCard';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { Button } from '@/components/buttons/Button';
import { Breadcrumb } from '@/components/navigation/Breadcrumb';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectCleanerById } from '@/redux/cleaner/cleanerSlice';
import { selectCleanerReviews } from '@/redux/reviews/reviewsSlice';
import { toggleFavorite, selectIsFavorite } from '@/redux/customer/customerSlice';
import { openModal, addToast } from '@/redux/ui/uiSlice';
import { services } from '@/data';
import { AppImage } from '@/components/common/AppImage';
import { formatDate } from '@/utils';

export function CleanerProfile() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const cleaner = useAppSelector(selectCleanerById(id ?? ''));
  const reviews = useAppSelector(selectCleanerReviews(id ?? ''));
  const isFavorite = useAppSelector(selectIsFavorite(id ?? ''));

  if (!cleaner) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold">{TEXT.COMMON.NO_RESULTS}</h2>
      </div>
    );
  }

  const cleanerServices = services.filter((s) => s.cleanerId === cleaner.id && s.isActive);

  const handleFavorite = () => {
    dispatch(toggleFavorite(cleaner.id));
    dispatch(addToast({
      type: 'success',
      message: isFavorite ? TEXT.TOAST.FAVORITE_REMOVED : TEXT.TOAST.FAVORITE_ADDED,
    }));
  };

  return (
    <div>
      {/* Banner */}
      <div className="relative h-48 sm:h-64 bg-gray-200">
        <AppImage src={cleaner.banner} alt={cleaner.businessName} showIconOnError className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-16 sm:-mt-20 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
            <AppImage
              src={cleaner.logo}
              alt={cleaner.businessName}
              className="h-24 w-24 sm:h-32 sm:w-32 rounded-2xl border-4 border-white object-cover shadow-lg"
            />
            <div className="flex-1 pb-2">
              <Breadcrumb items={[
                { label: 'Cleaners', href: '/search' },
                { label: cleaner.businessName },
              ]} />
              <div className="flex items-center gap-2 mt-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-text">{cleaner.businessName}</h1>
                {cleaner.isVerified && (
                  <span className="flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    <CheckCircle className="h-3 w-3" />
                    {TEXT.CLEANER_PROFILE.VERIFIED}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-4 mt-2">
                <RatingStars rating={cleaner.rating} showValue reviewCount={cleaner.reviewCount} />
                <span className="flex items-center gap-1 text-sm text-text-muted">
                  <MapPin className="h-4 w-4" />
                  {cleaner.location.city}, {cleaner.location.province}
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto pb-2">
              <Button variant="outline" onClick={handleFavorite} className="flex-1 sm:flex-none">
                <Heart className={`h-4 w-4 ${isFavorite ? 'fill-danger text-danger' : ''}`} />
                <span className="sm:hidden">{isFavorite ? TEXT.COMMON.REMOVE_FROM_FAVORITES : TEXT.COMMON.ADD_TO_FAVORITES}</span>
              </Button>
              <Button variant="outline" className="flex-1 sm:flex-none">
                <MessageSquare className="h-4 w-4" />
                <span className="hidden sm:inline">{TEXT.CLEANER_PROFILE.START_CHAT}</span>
                <span className="sm:hidden">Chat</span>
              </Button>
              <Button
                className="flex-1 sm:flex-none"
                onClick={() => {
                const firstService = cleanerServices[0];
                if (firstService) {
                  dispatch(openModal({
                    type: 'enquiry',
                    data: { serviceId: firstService.id, cleanerId: cleaner.id, serviceTitle: firstService.title },
                  }));
                }
              }}>
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">{TEXT.CLEANER_PROFILE.SEND_ENQUIRY}</span>
                <span className="sm:hidden">Enquire</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-16">
          <div className="lg:col-span-2 space-y-8">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-xl font-semibold mb-3">{TEXT.CLEANER_PROFILE.ABOUT}</h2>
              <p className="text-text-muted leading-relaxed">{cleaner.description}</p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: TEXT.CLEANER_PROFILE.EXPERIENCE, value: `${cleaner.experience}+ years`, icon: Briefcase },
                { label: TEXT.CLEANER_PROFILE.JOBS_COMPLETED, value: cleaner.jobsCompleted, icon: CheckCircle },
                { label: TEXT.CLEANER_PROFILE.RESPONSE_TIME, value: cleaner.responseTime, icon: Clock },
                { label: TEXT.CLEANER_PROFILE.MEMBER_SINCE, value: formatDate(cleaner.memberSince), icon: Calendar },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl bg-background p-4 text-center">
                  <stat.icon className="h-5 w-5 text-primary mx-auto mb-2" />
                  <p className="font-semibold text-text">{stat.value}</p>
                  <p className="text-xs text-text-muted mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">{TEXT.CLEANER_PROFILE.SERVICES}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cleanerServices.slice(0, 4).map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">{TEXT.CLEANER_PROFILE.GALLERY}</h2>
              <ImageGallery images={cleaner.gallery} alt={cleaner.businessName} />
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">{TEXT.CLEANER_PROFILE.REVIEWS} ({reviews.length})</h2>
              <div className="space-y-4">
                {reviews.slice(0, 5).map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-border p-5">
              <h3 className="font-semibold mb-4">{TEXT.CLEANER_PROFILE.WORKING_HOURS}</h3>
              <div className="space-y-2">
                {cleaner.workingHours.map((wh) => (
                  <div key={wh.day} className="flex justify-between text-sm">
                    <span className="text-text-muted">{wh.day}</span>
                    <span className="font-medium">
                      {wh.isClosed ? 'Closed' : `${wh.open} - ${wh.close}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border p-5">
              <h3 className="font-semibold mb-4">{TEXT.CLEANER_PROFILE.CERTIFICATES}</h3>
              <ul className="space-y-2">
                {cleaner.certificates.map((cert) => (
                  <li key={cert} className="flex items-center gap-2 text-sm text-text-muted">
                    <CheckCircle className="h-4 w-4 text-success shrink-0" />
                    {cert}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border p-5">
              <h3 className="font-semibold mb-2">{TEXT.COMMON.LOCATION}</h3>
              <p className="text-sm text-text-muted">{cleaner.location.address}</p>
              <p className="text-sm text-text-muted">{cleaner.location.city}, {cleaner.location.province}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
