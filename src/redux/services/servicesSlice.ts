import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Service, Category, SearchFilters, PaginatedResult } from '@/types';
import { services as mockServices, categories as mockCategories } from '@/data';
import { paginate } from '@/utils';
import type { RootState } from '../store';
import { defaultSearchFilters } from '../customer/customerSlice';

interface ServicesState {
  items: Service[];
  categories: Category[];
  filters: SearchFilters;
  selectedService: Service | null;
  isLoading: boolean;
}

const initialState: ServicesState = {
  items: mockServices,
  categories: mockCategories,
  filters: defaultSearchFilters,
  selectedService: null,
  isLoading: false,
};

function filterServices(services: Service[], filters: SearchFilters): Service[] {
  let filtered = [...services].filter((s) => s.isActive);

  if (filters.query) {
    const q = filters.query.toLowerCase();
    filtered = filtered.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.location.city.toLowerCase().includes(q)
    );
  }

  if (filters.categoryId) {
    filtered = filtered.filter((s) => s.categoryId === filters.categoryId);
  }

  if (filters.minPrice > 0) {
    filtered = filtered.filter((s) => s.price >= filters.minPrice);
  }

  if (filters.maxPrice < 500) {
    filtered = filtered.filter((s) => s.price <= filters.maxPrice);
  }

  if (filters.minRating > 0) {
    filtered = filtered.filter((s) => s.rating >= filters.minRating);
  }

  if (filters.location) {
    const loc = filters.location.toLowerCase();
    filtered = filtered.filter(
      (s) =>
        s.location.city.toLowerCase().includes(loc) ||
        s.location.province.toLowerCase().includes(loc)
    );
  }

  if (filters.serviceType) {
    filtered = filtered.filter((s) => s.serviceType === filters.serviceType);
  }

  switch (filters.sortBy) {
    case 'price_low':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price_high':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case 'newest':
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      break;
    case 'oldest':
      filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      break;
  }

  return filtered;
}

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<SearchFilters>>) => {
      state.filters = { ...state.filters, ...action.payload, page: action.payload.page ?? 1 };
    },
    resetFilters: (state) => {
      state.filters = defaultSearchFilters;
    },
    setSelectedService: (state, action: PayloadAction<Service | null>) => {
      state.selectedService = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.filters.page = action.payload;
    },
  },
});

export const { setFilters, resetFilters, setSelectedService, setPage } = servicesSlice.actions;

export const selectCategories = (state: RootState) => state.services.categories;
export const selectFilters = (state: RootState) => state.services.filters;
export const selectSelectedService = (state: RootState) => state.services.selectedService;
export const selectFeaturedServices = (state: RootState) =>
  state.services.items.filter((s) => s.isFeatured && s.isActive).slice(0, 8);

export const selectFilteredServices = (state: RootState): PaginatedResult<Service> => {
  const filtered = filterServices(state.services.items, state.services.filters);
  return paginate(filtered, state.services.filters.page, state.services.filters.pageSize);
};

export const selectServiceById = (id: string) => (state: RootState) =>
  state.services.items.find((s) => s.id === id);

export const selectRelatedServices = (serviceId: string, categoryId: string) => (state: RootState) =>
  state.services.items
    .filter((s) => s.categoryId === categoryId && s.id !== serviceId && s.isActive)
    .slice(0, 4);

export default servicesSlice.reducer;
