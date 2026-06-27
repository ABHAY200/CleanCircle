import { FileText } from 'lucide-react';
import { TEXT } from '@/constants/text';
import { EnquiryCard } from '@/components/cards/EnquiryCard';
import { EmptyState } from '@/components/feedback/EmptyState';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectCleanerProfile } from '@/redux/cleaner/cleanerSlice';
import { selectCleanerEnquiries, updateEnquiryStatus } from '@/redux/enquiries/enquiriesSlice';
import { ENQUIRY_STATUS } from '@/constants/enquiryStatus';

export function CleanerEnquiries() {
  const profile = useAppSelector(selectCleanerProfile);
  const enquiries = useAppSelector(selectCleanerEnquiries(profile?.id ?? ''));
  const dispatch = useAppDispatch();

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
      <h1 className="text-2xl font-bold text-text">{TEXT.CLEANER.ENQUIRIES.TITLE}</h1>
      <p className="text-text-muted mt-1">{TEXT.CLEANER.ENQUIRIES.SUBTITLE}</p>

      {enquiries.length === 0 ? (
        <EmptyState icon={FileText} title={TEXT.CLEANER.ENQUIRIES.EMPTY} />
      ) : (
        <div className="space-y-4 mt-8">
          {enquiries.map((e) => (
            <EnquiryCard key={e.id} enquiry={e} viewAs="cleaner" onAction={handleAction} />
          ))}
        </div>
      )}
    </div>
  );
}
