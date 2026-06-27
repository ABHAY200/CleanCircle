import { CheckCircle } from 'lucide-react';
import { TEXT } from '@/constants/text';
import { Input, Textarea } from '@/components/forms/FormField';
import { Button } from '@/components/buttons/Button';
import { ImageGallery } from '@/components/common/ImageGallery';
import { AppImage } from '@/components/common/AppImage';
import { useAppSelector } from '@/redux/hooks';
import { selectCleanerProfile } from '@/redux/cleaner/cleanerSlice';

export function BusinessProfile() {
  const profile = useAppSelector(selectCleanerProfile);
  if (!profile) return null;

  return (
    <div>
      <h1 className="text-2xl font-bold text-text">{TEXT.CLEANER.PROFILE.TITLE}</h1>

      <div className="mt-8 space-y-8 max-w-3xl">
        <div className="rounded-2xl border border-border bg-white p-6">
          <h2 className="text-lg font-semibold mb-4">{TEXT.CLEANER.PROFILE.COMPANY}</h2>
          <div className="flex items-center gap-4 mb-6">
            <AppImage src={profile.logo} alt={profile.businessName} className="h-20 w-20 rounded-2xl object-cover" />
            <Button variant="outline" size="sm">Change Logo</Button>
          </div>
          <div className="space-y-4">
            <Input label="Business Name" defaultValue={profile.businessName} />
            <Textarea label="Description" rows={4} defaultValue={profile.description} />
            <Input label="Phone" defaultValue={profile.phone} />
            <Input label="Email" defaultValue={profile.email} />
          </div>
          <Button className="mt-4">{TEXT.COMMON.SAVE}</Button>
        </div>

        <div className="rounded-2xl border border-border bg-white p-6">
          <h2 className="text-lg font-semibold mb-4">{TEXT.CLEANER.PROFILE.GALLERY}</h2>
          <ImageGallery images={profile.gallery} alt={profile.businessName} />
          <Button variant="outline" size="sm" className="mt-4">Upload Photos</Button>
        </div>

        <div className="rounded-2xl border border-border bg-white p-6">
          <h2 className="text-lg font-semibold mb-4">{TEXT.CLEANER.PROFILE.CERTIFICATES}</h2>
          <ul className="space-y-2">
            {profile.certificates.map((cert) => (
              <li key={cert} className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-success" />
                {cert}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-white p-6">
          <h2 className="text-lg font-semibold mb-4">{TEXT.CLEANER.PROFILE.HOURS}</h2>
          <div className="space-y-2">
            {profile.workingHours.map((wh) => (
              <div key={wh.day} className="flex justify-between text-sm">
                <span className="text-text-muted">{wh.day}</span>
                <span>{wh.isClosed ? 'Closed' : `${wh.open} - ${wh.close}`}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
