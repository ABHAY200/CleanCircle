import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { closeModal, selectModal } from '@/redux/ui/uiSlice';
import { cn } from '@/utils';

interface ModalProps {
  children: React.ReactNode;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizes = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
};

export function Modal({ children, title, size = 'md', className }: ModalProps) {
  const modal = useAppSelector(selectModal);
  const dispatch = useAppDispatch();

  if (!modal.isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => dispatch(closeModal())}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className={cn(
            'relative w-full rounded-t-2xl sm:rounded-2xl bg-white shadow-2xl max-h-[90dvh] overflow-y-auto',
            sizes[size],
            className
          )}
        >
          {title && (
            <div className="flex items-center justify-between border-b border-border px-4 sm:px-6 py-4 sticky top-0 bg-white z-10">
              <h2 className="text-lg font-semibold text-text">{title}</h2>
              <button
                onClick={() => dispatch(closeModal())}
                className="rounded-lg p-1.5 text-text-muted hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )}
          <div className="p-4 sm:p-6">{children}</div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: 'danger' | 'primary';
}

export function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  variant = 'primary',
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onCancel}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-md rounded-t-2xl sm:rounded-2xl bg-white p-6 shadow-2xl"
        >
          <h3 className="text-lg font-semibold text-text mb-2">{title}</h3>
          <p className="text-text-muted mb-6">{message}</p>
          <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded-xl text-sm font-medium text-text-muted hover:bg-gray-100 transition-colors"
            >
              {cancelLabel}
            </button>
            <button
              onClick={onConfirm}
              className={cn(
                'px-4 py-2 rounded-xl text-sm font-medium text-white transition-colors',
                variant === 'danger' ? 'bg-danger hover:bg-red-600' : 'bg-primary hover:bg-primary-dark'
              )}
            >
              {confirmLabel}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
