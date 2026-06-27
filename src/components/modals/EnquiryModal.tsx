import { useForm } from 'react-hook-form';
import { Modal } from '@/components/modals/Modal';
import { Input, Textarea } from '@/components/forms/FormField';
import { Button } from '@/components/buttons/Button';
import { TEXT } from '@/constants/text';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { closeModal, selectModal, addToast } from '@/redux/ui/uiSlice';
import { submitEnquiry } from '@/redux/enquiries/enquiriesSlice';
import type { EnquiryFormData } from '@/types';

export function EnquiryModal() {
  const modal = useAppSelector(selectModal);
  const dispatch = useAppDispatch();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<EnquiryFormData>();

  if (modal.type !== 'enquiry' || !modal.isOpen) return null;

  const data = modal.data as { serviceId: string; cleanerId: string; serviceTitle?: string };

  const onSubmit = async (formData: EnquiryFormData) => {
    await dispatch(submitEnquiry({
      ...formData,
      serviceId: data.serviceId,
      cleanerId: data.cleanerId,
    }));
    dispatch(addToast({ type: 'success', message: TEXT.TOAST.ENQUIRY_SENT }));
    dispatch(closeModal());
    reset();
  };

  return (
    <Modal title={TEXT.ENQUIRY.MODAL_TITLE} size="md">
      {data.serviceTitle && (
        <p className="text-sm text-text-muted mb-4">
          {TEXT.ENQUIRY.SERVICE}: <span className="font-medium text-text">{data.serviceTitle}</span>
        </p>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label={TEXT.ENQUIRY.DATE}
          type="date"
          {...register('preferredDate', { required: 'Date is required' })}
          error={errors.preferredDate?.message}
        />
        <Input
          label={TEXT.ENQUIRY.TIME}
          type="time"
          {...register('preferredTime', { required: 'Time is required' })}
          error={errors.preferredTime?.message}
        />
        <Textarea
          label={TEXT.ENQUIRY.MESSAGE}
          rows={4}
          placeholder={TEXT.ENQUIRY.MESSAGE_PLACEHOLDER}
          {...register('message', { required: 'Message is required' })}
          error={errors.message?.message}
        />
        <div className="flex gap-3 pt-2">
          <Button type="button" variant="outline" fullWidth onClick={() => dispatch(closeModal())}>
            {TEXT.COMMON.CANCEL}
          </Button>
          <Button type="submit" fullWidth>{TEXT.ENQUIRY.SUBMIT}</Button>
        </div>
      </form>
    </Modal>
  );
}
