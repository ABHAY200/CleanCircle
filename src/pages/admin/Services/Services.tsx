import { useState } from 'react';
import { TEXT } from '@/constants/text';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { Pagination } from '@/components/common/Pagination';
import { useAppSelector } from '@/redux/hooks';

export function AdminServices() {
  const [page, setLocalPage] = useState(1);
  const allServices = useAppSelector((state) => state.services.items.filter((s) => s.isActive));
  const pageSize = 12;
  const totalPages = Math.ceil(allServices.length / pageSize);
  const items = allServices.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div>
      <h1 className="text-2xl font-bold text-text">{TEXT.ADMIN.SERVICES.TITLE}</h1>
      <p className="text-text-muted mt-1">{TEXT.ADMIN.SERVICES.SUBTITLE}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {items.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      <Pagination page={page} totalPages={totalPages} onPageChange={setLocalPage} className="mt-8" />
    </div>
  );
}
