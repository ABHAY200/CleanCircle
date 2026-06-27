import { SlidersHorizontal } from 'lucide-react';
import { TEXT } from '@/constants/text';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setFilters, resetFilters, selectCategories, selectFilters } from '@/redux/services/servicesSlice';
import { Button } from '@/components/buttons/Button';

export function FilterPanel() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const filters = useAppSelector(selectFilters);

  return (
    <div className="rounded-2xl bg-white border border-border p-5 space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-text flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          {TEXT.SEARCH.FILTERS}
        </h3>
        <button
          onClick={() => dispatch(resetFilters())}
          className="text-xs text-primary hover:underline"
        >
          {TEXT.SEARCH.CLEAR_FILTERS}
        </button>
      </div>

      <div>
        <label className="text-sm font-medium text-text mb-2 block">{TEXT.SEARCH.CATEGORY}</label>
        <select
          value={filters.categoryId}
          onChange={(e) => dispatch(setFilters({ categoryId: e.target.value }))}
          className="w-full rounded-xl border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="">{TEXT.COMMON.ALL}</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm font-medium text-text mb-2 block">
          {TEXT.SEARCH.PRICE_RANGE}: ${filters.minPrice} - ${filters.maxPrice}
        </label>
        <div className="space-y-2">
          <input
            type="range"
            min={0}
            max={500}
            value={filters.maxPrice}
            onChange={(e) => dispatch(setFilters({ maxPrice: Number(e.target.value) }))}
            className="w-full accent-primary"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-text mb-2 block">{TEXT.SEARCH.MIN_RATING}</label>
        <div className="flex gap-2">
          {[0, 3, 4, 4.5].map((rating) => (
            <button
              key={rating}
              onClick={() => dispatch(setFilters({ minRating: rating }))}
              className={`flex-1 rounded-lg py-1.5 text-xs font-medium border transition-colors ${
                filters.minRating === rating
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border text-text-muted hover:border-primary/50'
              }`}
            >
              {rating === 0 ? TEXT.COMMON.ALL : `${rating}+`}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-text mb-2 block">{TEXT.SEARCH.AVAILABILITY}</label>
        <select
          value={filters.availability}
          onChange={(e) => dispatch(setFilters({ availability: e.target.value as typeof filters.availability }))}
          className="w-full rounded-xl border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="any">{TEXT.SEARCH.ANY_TIME}</option>
          <option value="now">{TEXT.SEARCH.AVAILABLE_NOW}</option>
          <option value="week">{TEXT.SEARCH.AVAILABLE_WEEK}</option>
        </select>
      </div>

      <div>
        <label className="text-sm font-medium text-text mb-2 block">{TEXT.SEARCH.LOCATION}</label>
        <input
          type="text"
          value={filters.location}
          onChange={(e) => dispatch(setFilters({ location: e.target.value }))}
          placeholder="City or province"
          className="w-full rounded-xl border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-text mb-2 block">{TEXT.COMMON.SORT_BY}</label>
        <select
          value={filters.sortBy}
          onChange={(e) => dispatch(setFilters({ sortBy: e.target.value as typeof filters.sortBy }))}
          className="w-full rounded-xl border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="rating">{TEXT.COMMON.TOP_RATED}</option>
          <option value="price_low">{TEXT.COMMON.PRICE_LOW}</option>
          <option value="price_high">{TEXT.COMMON.PRICE_HIGH}</option>
          <option value="newest">{TEXT.COMMON.NEWEST}</option>
        </select>
      </div>

      <Button fullWidth onClick={() => dispatch(setFilters({ page: 1 }))}>
        {TEXT.COMMON.APPLY}
      </Button>
    </div>
  );
}
