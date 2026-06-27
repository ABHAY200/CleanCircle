export const ENQUIRY_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  REJECTED: 'rejected',
} as const;

export type EnquiryStatus = (typeof ENQUIRY_STATUS)[keyof typeof ENQUIRY_STATUS];

export const ENQUIRY_STATUS_LABELS: Record<EnquiryStatus, string> = {
  pending: 'Pending',
  accepted: 'Accepted',
  completed: 'Completed',
  cancelled: 'Cancelled',
  rejected: 'Rejected',
};
