export const ROUTES = {
  HOME: '/',
  SEARCH: '/search',
  SERVICE_DETAILS: '/services/:id',
  CLEANER_PROFILE: '/cleaners/:id',
  LOGIN: '/login',
  REGISTER: '/register',

  CUSTOMER: {
    DASHBOARD: '/customer/dashboard',
    ENQUIRIES: '/customer/enquiries',
    MESSAGES: '/customer/messages',
    FAVORITES: '/customer/favorites',
    PROFILE: '/customer/profile',
  },

  CLEANER: {
    DASHBOARD: '/cleaner/dashboard',
    MY_SERVICES: '/cleaner/services',
    ENQUIRIES: '/cleaner/enquiries',
    MESSAGES: '/cleaner/messages',
    BUSINESS_PROFILE: '/cleaner/profile',
    REVIEWS: '/cleaner/reviews',
  },

  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    USERS: '/admin/users',
    SERVICES: '/admin/services',
    REPORTS: '/admin/reports',
  },
} as const;

export const buildRoute = {
  serviceDetails: (id: string) => `/services/${id}`,
  cleanerProfile: (id: string) => `/cleaners/${id}`,
};
