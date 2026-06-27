import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import customerReducer from './customer/customerSlice';
import cleanerReducer from './cleaner/cleanerSlice';
import servicesReducer from './services/servicesSlice';
import enquiriesReducer from './enquiries/enquiriesSlice';
import chatReducer from './chat/chatSlice';
import reviewsReducer from './reviews/reviewsSlice';
import uiReducer from './ui/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    cleaner: cleanerReducer,
    services: servicesReducer,
    enquiries: enquiriesReducer,
    chat: chatReducer,
    reviews: reviewsReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
