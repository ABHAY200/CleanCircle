import { TEXT } from '@/constants/text';
import { Input } from '@/components/forms/FormField';
import { AppImage } from '@/components/common/AppImage';
import { Button } from '@/components/buttons/Button';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { selectCustomerProfile } from '@/redux/customer/customerSlice';
import { addToast } from '@/redux/ui/uiSlice';

export function CustomerProfile() {
  const profile = useAppSelector(selectCustomerProfile);
  const dispatch = useAppDispatch();

  const handleSave = () => {
    dispatch(addToast({ type: 'success', message: 'Profile updated successfully' }));
  };

  if (!profile) return null;

  return (
    <div>
      <h1 className="text-2xl font-bold text-text">{TEXT.CUSTOMER.PROFILE.TITLE}</h1>

      <div className="mt-8 space-y-8 max-w-2xl">
        <div className="rounded-2xl border border-border bg-white p-6">
          <h2 className="text-lg font-semibold mb-4">{TEXT.CUSTOMER.PROFILE.PERSONAL_INFO}</h2>
          <div className="flex items-center gap-4 mb-6">
            <AppImage src={profile.avatar} alt={profile.firstName} className="h-20 w-20 rounded-full object-cover" />
            <Button variant="outline" size="sm">Change Photo</Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="First Name" defaultValue={profile.firstName} />
            <Input label="Last Name" defaultValue={profile.lastName} />
            <Input label="Email" type="email" defaultValue={profile.email} />
            <Input label="Phone" type="tel" defaultValue={profile.phone} />
          </div>
          <Button className="mt-4" onClick={handleSave}>{TEXT.COMMON.SAVE}</Button>
        </div>

        <div className="rounded-2xl border border-border bg-white p-6">
          <h2 className="text-lg font-semibold mb-4">{TEXT.CUSTOMER.PROFILE.ADDRESSES}</h2>
          {profile.addresses.map((addr) => (
            <div key={addr.id} className="rounded-xl border border-border p-4 mb-3">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">{addr.label}</span>
                {addr.isDefault && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Default</span>}
              </div>
              <p className="text-sm text-text-muted mt-1">{addr.street}</p>
              <p className="text-sm text-text-muted">{addr.city}, {addr.province} {addr.postalCode}</p>
            </div>
          ))}
          <Button variant="outline" size="sm">Add Address</Button>
        </div>

        <div className="rounded-2xl border border-border bg-white p-6">
          <h2 className="text-lg font-semibold mb-4">{TEXT.CUSTOMER.PROFILE.SETTINGS}</h2>
          <div className="space-y-3">
            <label className="flex items-center justify-between">
              <span className="text-sm">{TEXT.CUSTOMER.PROFILE.NOTIFICATIONS}</span>
              <input type="checkbox" defaultChecked className="rounded accent-primary" />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-sm">{TEXT.CUSTOMER.PROFILE.SMS}</span>
              <input type="checkbox" className="rounded accent-primary" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
