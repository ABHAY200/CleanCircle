export const SERVICE_TYPES = {
  RESIDENTIAL: 'residential',
  COMMERCIAL: 'commercial',
  OFFICE: 'office',
  CAR: 'car',
  SPECIALIZED: 'specialized',
} as const;

export type ServiceType = (typeof SERVICE_TYPES)[keyof typeof SERVICE_TYPES];

export const SERVICE_TYPE_LABELS: Record<ServiceType, string> = {
  residential: 'Residential Cleaning',
  commercial: 'Commercial Cleaning',
  office: 'Office Cleaning',
  car: 'Car Cleaning',
  specialized: 'Specialized Cleaning',
};
