import { BarChart3, TrendingUp, Users, MapPin } from 'lucide-react';
import { TEXT } from '@/constants/text';
import { StatCard } from '@/components/cards/StatCard';
import { cleaners, services, enquiries, reviews } from '@/data';

export function AdminReports() {
  const cityStats = ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa'].map((city) => ({
    city,
    cleaners: cleaners.filter((c) => c.location.city === city).length,
    services: services.filter((s) => s.location.city === city).length,
  }));

  return (
    <div>
      <h1 className="text-2xl font-bold text-text">{TEXT.ADMIN.REPORTS.TITLE}</h1>
      <p className="text-text-muted mt-1">{TEXT.ADMIN.REPORTS.SUBTITLE}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <StatCard label="Total Enquiries" value={enquiries.length} icon={BarChart3} color="bg-blue-100 text-blue-600" />
        <StatCard label="Completion Rate" value="78%" icon={TrendingUp} color="bg-green-100 text-green-600" />
        <StatCard label="Avg. Rating" value="4.6" icon={Users} color="bg-amber-100 text-amber-600" />
        <StatCard label="Total Reviews" value={reviews.length} icon={MapPin} color="bg-purple-100 text-purple-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="rounded-2xl border border-border bg-white p-6">
          <h2 className="font-semibold mb-4">Enquiries by Status</h2>
          <div className="space-y-3">
            {['pending', 'accepted', 'completed', 'cancelled', 'rejected'].map((status) => {
              const count = enquiries.filter((e) => e.status === status).length;
              const pct = enquiries.length ? (count / enquiries.length) * 100 : 0;
              return (
                <div key={status}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="capitalize text-text-muted">{status}</span>
                    <span className="font-medium">{count}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-6">
          <h2 className="font-semibold mb-4">Top Cities</h2>
          <div className="space-y-3">
            {cityStats.map(({ city, cleaners: c, services: s }) => (
              <div key={city} className="flex items-center justify-between text-sm">
                <span className="font-medium">{city}</span>
                <div className="flex gap-4 text-text-muted">
                  <span>{c} cleaners</span>
                  <span>{s} services</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
