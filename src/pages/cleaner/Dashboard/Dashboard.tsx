import { Link } from 'react-router-dom';
import { FileText, MessageSquare, Star, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { TEXT } from '@/constants/text';
import { ROUTES } from '@/constants/routes';
import { StatCard } from '@/components/cards/StatCard';
import { EnquiryCard } from '@/components/cards/EnquiryCard';
import { ReviewCard } from '@/components/cards/ReviewCard';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectCleanerProfile } from '@/redux/cleaner/cleanerSlice';
import { selectCleanerEnquiries } from '@/redux/enquiries/enquiriesSlice';
import { selectCleanerReviews } from '@/redux/reviews/reviewsSlice';
import { updateEnquiryStatus } from '@/redux/enquiries/enquiriesSlice';
import { ENQUIRY_STATUS } from '@/constants/enquiryStatus';

export function CleanerDashboard() {
  const profile = useAppSelector(selectCleanerProfile);
  const enquiries = useAppSelector(selectCleanerEnquiries(profile?.id ?? ''));
  const reviews = useAppSelector(selectCleanerReviews(profile?.id ?? ''));
  const dispatch = useAppDispatch();

  const stats = [
    { label: TEXT.CLEANER.DASHBOARD.STATS.ENQUIRIES, value: enquiries.filter((e) => e.status === 'pending').length, icon: FileText, color: 'bg-blue-100 text-blue-600' },
    { label: TEXT.CLEANER.DASHBOARD.STATS.ACTIVE, value: enquiries.filter((e) => e.status === 'accepted').length, icon: MessageSquare, color: 'bg-green-100 text-green-600' },
    { label: TEXT.CLEANER.DASHBOARD.STATS.RATING, value: profile?.rating ?? 0, icon: Star, color: 'bg-amber-100 text-amber-600' },
    { label: TEXT.CLEANER.DASHBOARD.STATS.REVENUE, value: '$12,450', icon: DollarSign, color: 'bg-purple-100 text-purple-600' },
  ];

  const handleAction = (id: string, action: string) => {
    const statusMap: Record<string, typeof ENQUIRY_STATUS[keyof typeof ENQUIRY_STATUS]> = {
      accept: ENQUIRY_STATUS.ACCEPTED,
      reject: ENQUIRY_STATUS.REJECTED,
      complete: ENQUIRY_STATUS.COMPLETED,
    };
    dispatch(updateEnquiryStatus({ id, status: statusMap[action] }));
  };

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-text">{TEXT.CLEANER.DASHBOARD.TITLE}</h1>
        <p className="text-text-muted mt-1">Welcome, {profile?.businessName}</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">{TEXT.CLEANER.DASHBOARD.RECENT_ENQUIRIES}</h2>
            <Link to={ROUTES.CLEANER.ENQUIRIES} className="text-sm text-primary hover:underline">{TEXT.COMMON.VIEW_ALL}</Link>
          </div>
          <div className="space-y-4">
            {enquiries.slice(0, 3).map((e) => (
              <EnquiryCard key={e.id} enquiry={e} viewAs="cleaner" onAction={handleAction} />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">{TEXT.CLEANER.DASHBOARD.RECENT_REVIEWS}</h2>
            <Link to={ROUTES.CLEANER.REVIEWS} className="text-sm text-primary hover:underline">{TEXT.COMMON.VIEW_ALL}</Link>
          </div>
          <div className="space-y-4">
            {reviews.slice(0, 3).map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
