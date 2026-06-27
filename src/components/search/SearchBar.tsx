import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { TEXT } from '@/constants/text';
import { ROUTES } from '@/constants/routes';
import { useAppDispatch } from '@/redux/hooks';
import { setFilters } from '@/redux/services/servicesSlice';
import { cn } from '@/utils';

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  size?: 'md' | 'lg';
  showLocation?: boolean;
}

export function SearchBar({
  placeholder = TEXT.HOME.SEARCH_PLACEHOLDER,
  className,
  size = 'md',
  showLocation = false,
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setFilters({ query, location, page: 1 }));
    navigate(ROUTES.SEARCH);
  };

  return (
    <motion.form
      onSubmit={handleSearch}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className={cn(
        'flex flex-col sm:flex-row sm:items-stretch bg-white rounded-2xl shadow-lg border border-border overflow-hidden w-full',
        size === 'lg' ? 'p-2 gap-2 sm:gap-0' : 'p-1.5 gap-1.5 sm:gap-0',
        className
      )}
    >
      <div className="flex flex-1 items-center gap-3 px-3 sm:px-4 min-w-0">
        <Search className="h-5 w-5 text-text-muted shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="flex-1 min-w-0 py-2.5 text-sm text-text placeholder:text-text-muted focus:outline-none bg-transparent"
        />
      </div>

      {showLocation && (
        <>
          <div className="hidden sm:block w-px bg-border self-stretch my-2" />
          <div className="flex items-center gap-2 px-3 sm:px-4 border-t sm:border-t-0 border-border pt-2 sm:pt-0">
            <MapPin className="h-5 w-5 text-text-muted shrink-0" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City or province"
              className="flex-1 min-w-0 py-2.5 text-sm text-text placeholder:text-text-muted focus:outline-none bg-transparent"
            />
          </div>
        </>
      )}

      <button
        type="submit"
        className={cn(
          'bg-primary text-white font-medium rounded-xl transition-colors hover:bg-primary-dark shrink-0 w-full sm:w-auto',
          size === 'lg' ? 'px-8 py-3 text-base' : 'px-6 py-2.5 text-sm'
        )}
      >
        {TEXT.HOME.SEARCH_BUTTON}
      </button>
    </motion.form>
  );
}
