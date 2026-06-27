import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { TEXT } from '@/constants/text';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { EmptyState } from '@/components/feedback/EmptyState';
import { Button } from '@/components/buttons/Button';
import { ConfirmDialog } from '@/components/modals/Modal';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectMyServices, deleteService } from '@/redux/cleaner/cleanerSlice';
import { addToast } from '@/redux/ui/uiSlice';
import { Wrench } from 'lucide-react';

export function MyServices() {
  const services = useAppSelector(selectMyServices);
  const dispatch = useAppDispatch();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = () => {
    if (deleteId) {
      dispatch(deleteService(deleteId));
      dispatch(addToast({ type: 'success', message: TEXT.TOAST.SERVICE_DELETED }));
      setDeleteId(null);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-text">{TEXT.CLEANER.SERVICES.TITLE}</h1>
          <p className="text-text-muted mt-1">{TEXT.CLEANER.SERVICES.SUBTITLE}</p>
        </div>
        <Button className="w-full sm:w-auto shrink-0"><Plus className="h-4 w-4" />{TEXT.CLEANER.SERVICES.ADD}</Button>
      </div>

      {services.length === 0 ? (
        <EmptyState icon={Wrench} title={TEXT.CLEANER.SERVICES.EMPTY} actionLabel={TEXT.CLEANER.SERVICES.ADD} onAction={() => {}} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {services.map((service) => (
            <div key={service.id} className="relative group">
              <ServiceCard service={service} />
              <div className="absolute top-3 right-3 flex gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                <button className="rounded-lg bg-white p-2 shadow-sm hover:bg-gray-50">
                  <Pencil className="h-4 w-4 text-text-muted" />
                </button>
                <button
                  onClick={() => setDeleteId(service.id)}
                  className="rounded-lg bg-white p-2 shadow-sm hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 text-danger" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deleteId}
        title={TEXT.CLEANER.SERVICES.DELETE}
        message={TEXT.CLEANER.SERVICES.CONFIRM_DELETE}
        confirmLabel={TEXT.COMMON.DELETE}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        variant="danger"
      />
    </div>
  );
}
