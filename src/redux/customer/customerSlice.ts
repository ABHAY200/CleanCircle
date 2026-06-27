import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Customer, SearchFilters } from '@/types';
import { customers as mockCustomers } from '@/data';
import type { RootState } from '../store';

interface CustomerState {
  profile: Customer | null;
  favoriteCleanerIds: string[];
  isLoading: boolean;
}

const initialState: CustomerState = {
  profile: mockCustomers[0],
  favoriteCleanerIds: mockCustomers[0]?.favoriteCleanerIds ?? [],
  isLoading: false,
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setCustomerProfile: (state, action: PayloadAction<Customer>) => {
      state.profile = action.payload;
      state.favoriteCleanerIds = action.payload.favoriteCleanerIds;
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const index = state.favoriteCleanerIds.indexOf(id);
      if (index === -1) {
        state.favoriteCleanerIds.push(id);
      } else {
        state.favoriteCleanerIds.splice(index, 1);
      }
      if (state.profile) {
        state.profile.favoriteCleanerIds = state.favoriteCleanerIds;
      }
    },
    updateProfile: (state, action: PayloadAction<Partial<Customer>>) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
      }
    },
  },
});

export const { setCustomerProfile, toggleFavorite, updateProfile } = customerSlice.actions;

export const selectCustomerProfile = (state: RootState) => state.customer.profile;
export const selectFavoriteCleanerIds = (state: RootState) => state.customer.favoriteCleanerIds;
export const selectIsFavorite = (cleanerId: string) => (state: RootState) =>
  state.customer.favoriteCleanerIds.includes(cleanerId);

export default customerSlice.reducer;

export const defaultSearchFilters: SearchFilters = {
  query: '',
  categoryId: '',
  minPrice: 0,
  maxPrice: 500,
  minRating: 0,
  availability: 'any',
  location: '',
  serviceType: '',
  sortBy: 'rating',
  viewMode: 'grid',
  page: 1,
  pageSize: 12,
};
