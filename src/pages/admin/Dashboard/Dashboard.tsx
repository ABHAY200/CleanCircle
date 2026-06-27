import { Users, Wrench, FileText, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { TEXT } from '@/constants/text';
import { StatCard } from '@/components/cards/StatCard';
import { cleaners, customers, services, enquiries } from '@/data';

export function AdminDashboard() {
  const stats = [
    { label: TEXT.ADMIN.DASHBOARD.STATS.USERS, value: customers.length + cleaners.length, icon: Users, color: 'bg-blue-100 text-blue-600', change: '+12% this month' },
    { label: TEXT.ADMIN.DASHBOARD.STATS.CLEANERS, value: cleaners.length, icon: Wrench, color: 'bg-green-100 text-green-600', change: '+5 new' },
    { label: TEXT.ADMIN.DASHBOARD.STATS.SERVICES, value: services.length, icon: FileText, color: 'bg-purple-100 text-purple-600' },
    { label: TEXT.ADMIN.DASHBOARD.STATS.ENQUIRIES, value: enquiries.length, icon: TrendingUp, color: 'bg-amber-100 text-amber-600', change: '+18% this week' },
  ];

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-text">{TEXT.ADMIN.DASHBOARD.TITLE}</h1>
        <p className="text-text-muted mt-1">{TEXT.ADMIN.DASHBOARD.OVERVIEW}</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="rounded-2xl border border-border bg-white p-6">
          <h2 className="font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {['New cleaner registered', 'Service listing approved', 'Enquiry completed', 'Review submitted'].map((activity, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-text-muted">{activity}</span>
                <span className="text-xs text-text-muted ml-auto">{i + 1}h ago</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-white p-6">
          <h2 className="font-semibold mb-4">Platform Health</h2>
          <div className="space-y-4">
            {[
              { label: 'Active Users', value: 85 },
              { label: 'Service Coverage', value: 92 },
              { label: 'Customer Satisfaction', value: 96 },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-text-muted">{item.label}</span>
                  <span className="font-medium">{item.value}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
