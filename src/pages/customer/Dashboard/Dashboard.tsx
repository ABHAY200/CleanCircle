import { Link } from 'react-router-dom';
import { FileText, MessageSquare, Heart, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { TEXT } from '@/constants/text';
import { ROUTES } from '@/constants/routes';
import { StatCard } from '@/components/cards/StatCard';
import { EnquiryCard } from '@/components/cards/EnquiryCard';
import { CleanerCard } from '@/components/cards/CleanerCard';
import { useAppSelector } from '@/redux/hooks';
import { selectUser } from '@/redux/auth/authSlice';
import { selectCustomerEnquiries } from '@/redux/enquiries/enquiriesSlice';
import { selectFavoriteCleanerIds } from '@/redux/customer/customerSlice';
import { selectUserConversations } from '@/redux/chat/chatSlice';
import { cleaners } from '@/data';

export function CustomerDashboard() {
  const user = useAppSelector(selectUser);
  const enquiries = useAppSelector(selectCustomerEnquiries(user?.id ?? 'demo-customer'));
  const favoriteIds = useAppSelector(selectFavoriteCleanerIds);
  const conversations = useAppSelector(selectUserConversations(user?.id ?? 'demo-customer'));
  const favoriteCleaners = cleaners.filter((c) => favoriteIds.includes(c.id));

  const stats = [
    { label: TEXT.CUSTOMER.DASHBOARD.STATS.ENQUIRIES, value: enquiries.length, icon: FileText, color: 'bg-blue-100 text-blue-600' },
    { label: TEXT.CUSTOMER.DASHBOARD.STATS.ACTIVE, value: conversations.length, icon: MessageSquare, color: 'bg-green-100 text-green-600' },
    { label: TEXT.CUSTOMER.DASHBOARD.STATS.FAVORITES, value: favoriteIds.length, icon: Heart, color: 'bg-red-100 text-red-600' },
    { label: TEXT.CUSTOMER.DASHBOARD.STATS.COMPLETED, value: enquiries.filter((e) => e.status === 'completed').length, icon: CheckCircle, color: 'bg-purple-100 text-purple-600' },
  ];

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-text">
          {TEXT.CUSTOMER.DASHBOARD.TITLE}, {user?.firstName ?? 'Customer'}!
        </h1>
        <p className="text-text-muted mt-1">{TEXT.COMMON.DEMO_MODE}</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">{TEXT.CUSTOMER.DASHBOARD.RECENT_ENQUIRIES}</h2>
            <Link to={ROUTES.CUSTOMER.ENQUIRIES} className="text-sm text-primary hover:underline">{TEXT.COMMON.VIEW_ALL}</Link>
          </div>
          <div className="space-y-4">
            {enquiries.slice(0, 3).map((e) => (
              <EnquiryCard key={e.id} enquiry={e} viewAs="customer" />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">{TEXT.CUSTOMER.DASHBOARD.FAVORITE_CLEANERS}</h2>
            <Link to={ROUTES.CUSTOMER.FAVORITES} className="text-sm text-primary hover:underline">{TEXT.COMMON.VIEW_ALL}</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {favoriteCleaners.slice(0, 2).map((c) => (
              <CleanerCard key={c.id} cleaner={c} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
