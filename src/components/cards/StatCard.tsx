import type { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/utils';

interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
  color?: string;
  className?: string;
}

export function StatCard({ label, value, change, icon: Icon, color = 'bg-primary/10 text-primary', className }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('rounded-2xl bg-white p-5 border border-border shadow-sm', className)}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-text-muted">{label}</p>
          <p className="text-2xl font-bold text-text mt-1">{value}</p>
          {change && <p className="text-xs text-success mt-1">{change}</p>}
        </div>
        <div className={cn('rounded-xl p-3', color)}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </motion.div>
  );
}
