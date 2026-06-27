import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getCategoryIcon } from '@/constants/icons';
import type { Category } from '@/types';
import { ROUTES } from '@/constants/routes';
import { useAppDispatch } from '@/redux/hooks';
import { setFilters } from '@/redux/services/servicesSlice';
import { cn } from '@/utils';

interface CategoryCardProps {
  category: Category;
  className?: string;
}

export function CategoryCard({ category, className }: CategoryCardProps) {
  const dispatch = useAppDispatch();
  const Icon = getCategoryIcon(category.icon);

  const handleClick = () => {
    dispatch(setFilters({ categoryId: category.id, page: 1 }));
  };

  return (
    <motion.div whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Link
        to={ROUTES.SEARCH}
        onClick={handleClick}
        className={cn(
          'flex flex-col items-center gap-3 rounded-2xl bg-white p-6 shadow-sm border border-border hover:shadow-md hover:border-primary/30 transition-all text-center group',
          className
        )}
      >
        <div className="rounded-2xl bg-primary/10 p-4 group-hover:bg-primary/20 transition-colors">
          <Icon className="h-7 w-7 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-text text-sm">{category.name}</h3>
          <p className="text-xs text-text-muted mt-1">{category.serviceCount} services</p>
        </div>
      </Link>
    </motion.div>
  );
}
