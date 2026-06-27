import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { Enquiry, EnquiryFormData } from '@/types';
import { enquiries as mockEnquiries } from '@/data';
import { ENQUIRY_STATUS } from '@/constants/enquiryStatus';
import type { RootState } from '../store';

interface EnquiriesState {
  items: Enquiry[];
  isLoading: boolean;
  error: string | null;
}

const initialState: EnquiriesState = {
  items: mockEnquiries,
  isLoading: false,
  error: null,
};

export const submitEnquiry = createAsyncThunk(
  'enquiries/submit',
  async (data: EnquiryFormData) => {
    await new Promise((r) => setTimeout(r, 1000));
    const enquiry: Enquiry = {
      id: `enquiry-${Date.now()}`,
      customerId: 'demo-customer',
      cleanerId: data.cleanerId,
      serviceId: data.serviceId,
      status: ENQUIRY_STATUS.PENDING,
      message: data.message,
      preferredDate: data.preferredDate,
      preferredTime: data.preferredTime,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return enquiry;
  }
);

const enquiriesSlice = createSlice({
  name: 'enquiries',
  initialState,
  reducers: {
    updateEnquiryStatus: (
      state,
      action: PayloadAction<{ id: string; status: Enquiry['status'] }>
    ) => {
      const enquiry = state.items.find((e) => e.id === action.payload.id);
      if (enquiry) {
        enquiry.status = action.payload.status;
        enquiry.updatedAt = new Date().toISOString();
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(submitEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.unshift(action.payload);
      })
      .addCase(submitEnquiry.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Failed to submit enquiry';
      });
  },
});

export const { updateEnquiryStatus } = enquiriesSlice.actions;

export const selectAllEnquiries = (state: RootState) => state.enquiries.items;
export const selectCustomerEnquiries = (customerId: string) => (state: RootState) =>
  state.enquiries.items.filter((e) => e.customerId === customerId);
export const selectCleanerEnquiries = (cleanerId: string) => (state: RootState) =>
  state.enquiries.items.filter((e) => e.cleanerId === cleanerId);
export const selectRecentEnquiries = (limit: number) => (state: RootState) =>
  [...state.enquiries.items]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);

export default enquiriesSlice.reducer;
