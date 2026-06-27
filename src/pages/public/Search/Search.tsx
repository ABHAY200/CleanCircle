import { useState } from 'react';
import { LayoutGrid, List, Search as SearchIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { TEXT } from '@/constants/text';
import { FilterPanel } from '@/components/search/FilterPanel';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { Pagination } from '@/components/common/Pagination';
import { EmptyState } from '@/components/feedback/EmptyState';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setFilters, setPage, selectFilteredServices, selectFilters } from '@/redux/services/servicesSlice';
import { cn } from '@/utils';

export function Search() {
  const dispatch = useAppDispatch();
  const results = useAppSelector(selectFilteredServices);
  const filters = useAppSelector(selectFilters);
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-text">{TEXT.SEARCH.TITLE}</h1>
        <p className="text-text-muted mt-2">{TEXT.SEARCH.SUBTITLE}</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters - desktop */}
        <aside className="hidden lg:block w-72 shrink-0">
          <FilterPanel />
        </aside>

        <div className="flex-1">
          {/* Search bar & controls */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="flex-1 flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-2">
              <SearchIcon className="h-5 w-5 text-text-muted shrink-0" />
              <input
                type="text"
                value={filters.query}
                onChange={(e) => dispatch(setFilters({ query: e.target.value }))}
                placeholder={TEXT.SEARCH.SEARCH_PLACEHOLDER}
                className="flex-1 text-sm focus:outline-none bg-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden rounded-xl border border-border px-4 py-2 text-sm font-medium hover:bg-gray-50"
              >
                {TEXT.SEARCH.FILTERS}
              </button>
              <div className="flex rounded-xl border border-border overflow-hidden">
                <button
                  onClick={() => dispatch(setFilters({ viewMode: 'grid' }))}
                  className={cn('p-2.5', filters.viewMode === 'grid' ? 'bg-primary text-white' : 'text-text-muted hover:bg-gray-50')}
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => dispatch(setFilters({ viewMode: 'list' }))}
                  className={cn('p-2.5', filters.viewMode === 'list' ? 'bg-primary text-white' : 'text-text-muted hover:bg-gray-50')}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile filters */}
          {showFilters && (
            <div className="lg:hidden mb-6">
              <FilterPanel />
            </div>
          )}

          <p className="text-sm text-text-muted mb-4">
            {TEXT.COMMON.SHOWING} {results.items.length} {TEXT.COMMON.OF} {results.total} {TEXT.COMMON.RESULTS}
          </p>

          {results.items.length === 0 ? (
            <EmptyState
              icon={SearchIcon}
              title={TEXT.SEARCH.NO_RESULTS}
              description={TEXT.COMMON.TRY_AGAIN}
            />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={cn(
                filters.viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
                  : 'space-y-4'
              )}
            >
              {results.items.map((service) => (
                <ServiceCard key={service.id} service={service} viewMode={filters.viewMode} />
              ))}
            </motion.div>
          )}

          <Pagination
            page={results.page}
            totalPages={results.totalPages}
            onPageChange={(page) => dispatch(setPage(page))}
            className="mt-8"
          />
        </div>
      </div>
    </div>
  );
}
