export const ROLES = {
  CUSTOMER: 'customer',
  CLEANER: 'cleaner',
  ADMIN: 'admin',
  GUEST: 'guest',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
