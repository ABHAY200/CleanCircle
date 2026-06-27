import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Toast, ModalState } from '@/types';
import type { RootState } from '../store';

interface UIState {
  toasts: Toast[];
  modal: ModalState;
  sidebarOpen: boolean;
  isMobileMenuOpen: boolean;
}

const initialState: UIState = {
  toasts: [],
  modal: { isOpen: false, type: null },
  sidebarOpen: true,
  isMobileMenuOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<Omit<Toast, 'id'>>) => {
      state.toasts.push({ ...action.payload, id: `toast-${Date.now()}` });
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
    openModal: (state, action: PayloadAction<{ type: ModalState['type']; data?: Record<string, unknown> }>) => {
      state.modal = { isOpen: true, type: action.payload.type, data: action.payload.data };
    },
    closeModal: (state) => {
      state.modal = { isOpen: false, type: null };
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setMobileMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.isMobileMenuOpen = action.payload;
    },
  },
});

export const { addToast, removeToast, openModal, closeModal, toggleSidebar, setMobileMenuOpen } =
  uiSlice.actions;

export const selectToasts = (state: RootState) => state.ui.toasts;
export const selectModal = (state: RootState) => state.ui.modal;
export const selectSidebarOpen = (state: RootState) => state.ui.sidebarOpen;
export const selectMobileMenuOpen = (state: RootState) => state.ui.isMobileMenuOpen;

export default uiSlice.reducer;
