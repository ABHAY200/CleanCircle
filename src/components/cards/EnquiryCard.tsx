import { Calendar, Clock, MessageSquare } from 'lucide-react';
import type { Enquiry } from '@/types';
import { StatusBadge } from '@/components/common/Badge';
import { formatDate } from '@/utils';
import { services, customers, cleaners } from '@/data';

interface EnquiryCardProps {
  enquiry: Enquiry;
  viewAs: 'customer' | 'cleaner';
  onAction?: (id: string, action: string) => void;
  className?: string;
}

export function EnquiryCard({ enquiry, viewAs, onAction, className }: EnquiryCardProps) {
  const service = services.find((s) => s.id === enquiry.serviceId);
  const customer = customers.find((c) => c.id === enquiry.customerId);
  const cleaner = cleaners.find((c) => c.id === enquiry.cleanerId);

  return (
    <div className={`rounded-2xl bg-white p-5 border border-border hover:shadow-sm transition-shadow ${className ?? ''}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-text truncate">{service?.title ?? 'Service'}</h3>
            <StatusBadge status={enquiry.status} />
          </div>
          <p className="text-sm text-text-muted">
            {viewAs === 'customer'
              ? `${cleaner?.businessName ?? 'Cleaner'}`
              : `${customer?.firstName ?? ''} ${customer?.lastName ?? ''}`}
          </p>
          <p className="text-sm text-text-muted mt-2 line-clamp-2 flex items-start gap-1.5">
            <MessageSquare className="h-3.5 w-3.5 mt-0.5 shrink-0" />
            {enquiry.message}
          </p>
          <div className="flex items-center gap-4 mt-3 text-xs text-text-muted">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(enquiry.preferredDate)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {enquiry.preferredTime}
            </span>
          </div>
        </div>
      </div>
      {viewAs === 'cleaner' && enquiry.status === 'pending' && onAction && (
        <div className="flex gap-2 mt-4 pt-4 border-t border-border">
          <button
            onClick={() => onAction(enquiry.id, 'accept')}
            className="flex-1 rounded-xl bg-primary text-white py-2 text-sm font-medium hover:bg-primary-dark transition-colors"
          >
            Accept
          </button>
          <button
            onClick={() => onAction(enquiry.id, 'reject')}
            className="flex-1 rounded-xl border border-border py-2 text-sm font-medium text-text-muted hover:bg-gray-50 transition-colors"
          >
            Reject
          </button>
        </div>
      )}
      {viewAs === 'cleaner' && enquiry.status === 'accepted' && onAction && (
        <div className="mt-4 pt-4 border-t border-border">
          <button
            onClick={() => onAction(enquiry.id, 'complete')}
            className="w-full rounded-xl bg-success text-white py-2 text-sm font-medium hover:bg-green-600 transition-colors"
          >
            Mark Complete
          </button>
        </div>
      )}
    </div>
  );
}
