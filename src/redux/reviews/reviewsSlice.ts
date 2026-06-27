import { createSlice } from '@reduxjs/toolkit';
import type { Review } from '@/types';
import { reviews as mockReviews } from '@/data';
import type { RootState } from '../store';

interface ReviewsState {
  items: Review[];
  isLoading: boolean;
}

const initialState: ReviewsState = {
  items: mockReviews,
  isLoading: false,
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
});

export const selectAllReviews = (state: RootState) => state.reviews.items;

export const selectCleanerReviews = (cleanerId: string) => (state: RootState) =>
  state.reviews.items.filter((r) => r.cleanerId === cleanerId);

export const selectServiceReviews = (serviceId: string) => (state: RootState) =>
  state.reviews.items.filter((r) => r.serviceId === serviceId);

export const selectRecentReviews = (limit: number) => (state: RootState) =>
  [...state.reviews.items]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);

export default reviewsSlice.reducer;
