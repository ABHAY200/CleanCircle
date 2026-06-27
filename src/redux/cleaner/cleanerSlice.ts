import { createSlice, type PayloadAction, createSelector } from '@reduxjs/toolkit';
import type { Cleaner, Service, ServiceFormData } from '@/types';
import { cleaners as mockCleaners, services as mockServices } from '@/data';
import type { RootState } from '../store';

interface CleanerState {
  profile: Cleaner | null;
  myServices: Service[];
  isLoading: boolean;
}

const demoCleaner = mockCleaners[0];

const initialState: CleanerState = {
  profile: demoCleaner,
  myServices: mockServices.filter((s) => s.cleanerId === demoCleaner.id),
  isLoading: false,
};

const cleanerSlice = createSlice({
  name: 'cleaner',
  initialState,
  reducers: {
    setCleanerProfile: (state, action: PayloadAction<Cleaner>) => {
      state.profile = action.payload;
      state.myServices = mockServices.filter((s) => s.cleanerId === action.payload.id);
    },
    addService: (state, action: PayloadAction<ServiceFormData>) => {
      const data = action.payload;
      const newService: Service = {
        id: `service-${Date.now()}`,
        title: data.title,
        description: data.description,
        shortDescription: data.description.slice(0, 100),
        price: data.price,
        priceType: data.priceType,
        duration: data.duration,
        categoryId: data.categoryId,
        cleanerId: state.profile?.id ?? '',
        serviceType: data.serviceType,
        features: data.features,
        images: [],
        rating: 0,
        reviewCount: 0,
        isActive: true,
        isFeatured: false,
        location: state.profile?.location ?? { city: '', province: '', address: '', lat: 0, lng: 0 },
        createdAt: new Date().toISOString(),
      };
      state.myServices.push(newService);
    },
    updateService: (state, action: PayloadAction<{ id: string; data: Partial<Service> }>) => {
      const index = state.myServices.findIndex((s) => s.id === action.payload.id);
      if (index !== -1) {
        state.myServices[index] = { ...state.myServices[index], ...action.payload.data };
      }
    },
    deleteService: (state, action: PayloadAction<string>) => {
      state.myServices = state.myServices.filter((s) => s.id !== action.payload);
    },
    updateCleanerProfile: (state, action: PayloadAction<Partial<Cleaner>>) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
      }
    },
  },
});

export const { setCleanerProfile, addService, updateService, deleteService, updateCleanerProfile } =
  cleanerSlice.actions;

export const selectCleanerProfile = (state: RootState) => state.cleaner.profile;
export const selectMyServices = (state: RootState) => state.cleaner.myServices;
export const selectFeaturedCleaners = createSelector(
  [(_state: RootState) => mockCleaners],
  (cleaners) => cleaners.filter((c) => c.isFeatured)
);
export const selectCleanerById = (id: string) => createSelector(
  [(_state: RootState) => mockCleaners],
  (cleaners) => cleaners.find((c) => c.id === id)
);

export default cleanerSlice.reducer;
