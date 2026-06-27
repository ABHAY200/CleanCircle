import { FileText } from 'lucide-react';
import { TEXT } from '@/constants/text';
import { ROUTES } from '@/constants/routes';
import { EnquiryCard } from '@/components/cards/EnquiryCard';
import { EmptyState } from '@/components/feedback/EmptyState';
import { useAppSelector } from '@/redux/hooks';
import { selectUser } from '@/redux/auth/authSlice';
import { selectCustomerEnquiries } from '@/redux/enquiries/enquiriesSlice';

export function CustomerEnquiries() {
  const user = useAppSelector(selectUser);
  const enquiries = useAppSelector(selectCustomerEnquiries(user?.id ?? 'demo-customer'));

  return (
    <div>
      <h1 className="text-2xl font-bold text-text">{TEXT.CUSTOMER.ENQUIRIES.TITLE}</h1>
      <p className="text-text-muted mt-1">{TEXT.CUSTOMER.ENQUIRIES.SUBTITLE}</p>

      {enquiries.length === 0 ? (
        <EmptyState
          icon={FileText}
          title={TEXT.CUSTOMER.ENQUIRIES.EMPTY}
          actionLabel={TEXT.CUSTOMER.ENQUIRIES.BROWSE}
          onAction={() => window.location.href = ROUTES.SEARCH}
        />
      ) : (
        <div className="space-y-4 mt-8">
          {enquiries.map((e) => (
            <EnquiryCard key={e.id} enquiry={e} viewAs="customer" />
          ))}
        </div>
      )}
    </div>
  );
}
