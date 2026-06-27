import type { Role } from '@/constants/roles';
import type { EnquiryStatus } from '@/constants/enquiryStatus';
import type { ServiceType } from '@/constants/serviceTypes';

export interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  isDefault: boolean;
}

export interface WorkingHours {
  day: string;
  open: string;
  close: string;
  isClosed: boolean;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  avatar: string;
  role: Role;
  createdAt: string;
  isVerified: boolean;
}

export interface Customer extends User {
  role: 'customer';
  addresses: Address[];
  favoriteCleanerIds: string[];
}

export interface Cleaner extends User {
  role: 'cleaner';
  businessName: string;
  description: string;
  banner: string;
  logo: string;
  gallery: string[];
  location: Location;
  rating: number;
  reviewCount: number;
  experience: number;
  workingHours: WorkingHours[];
  certificates: string[];
  serviceIds: string[];
  isFeatured: boolean;
  isAvailable: boolean;
  responseTime: string;
  jobsCompleted: number;
  memberSince: string;
}

export interface Admin extends User {
  role: 'admin';
}

export interface Location {
  city: string;
  province: string;
  address: string;
  lat: number;
  lng: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  serviceType: ServiceType;
  serviceCount: number;
  image: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  price: number;
  priceType: 'hourly' | 'fixed';
  duration: number;
  categoryId: string;
  cleanerId: string;
  serviceType: ServiceType;
  features: string[];
  images: string[];
  rating: number;
  reviewCount: number;
  isActive: boolean;
  isFeatured: boolean;
  location: Location;
  createdAt: string;
}

export interface Review {
  id: string;
  customerId: string;
  cleanerId: string;
  serviceId: string;
  rating: number;
  comment: string;
  createdAt: string;
  isVerified: boolean;
}

export interface Enquiry {
  id: string;
  customerId: string;
  cleanerId: string;
  serviceId: string;
  status: EnquiryStatus;
  message: string;
  preferredDate: string;
  preferredTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  createdAt: string;
  isRead: boolean;
  imageUrl?: string;
}

export interface Conversation {
  id: string;
  participantIds: string[];
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: Record<string, number>;
  enquiryId?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
  link?: string;
}

export interface SearchFilters {
  query: string;
  categoryId: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  availability: 'any' | 'now' | 'week';
  location: string;
  serviceType: ServiceType | '';
  sortBy: 'newest' | 'oldest' | 'price_low' | 'price_high' | 'rating';
  viewMode: 'grid' | 'list';
  page: number;
  pageSize: number;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface StatCard {
  label: string;
  value: string | number;
  change?: string;
  icon: string;
  color: string;
}

export interface EnquiryFormData {
  serviceId: string;
  cleanerId: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
}

export interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

export interface RegisterFormData {
  role: 'customer' | 'cleaner';
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  businessName?: string;
}

export interface ServiceFormData {
  title: string;
  description: string;
  price: number;
  priceType: 'hourly' | 'fixed';
  duration: number;
  categoryId: string;
  serviceType: ServiceType;
  features: string[];
}

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

export interface ModalState {
  isOpen: boolean;
  type: 'enquiry' | 'confirm' | 'service' | null;
  data?: Record<string, unknown>;
}
