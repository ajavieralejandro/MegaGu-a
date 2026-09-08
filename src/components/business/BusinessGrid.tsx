import type { Category } from '../../types';
import type { Business } from '../../types';
import { BusinessCard } from './BusinessCard';

interface BusinessGridProps {
  businesses: Business[];
  categoryMap?: Map<string, Category>;
}

export function BusinessGrid({ businesses, categoryMap }: BusinessGridProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {businesses.map((business) => (
        <BusinessCard
          key={business.id}
          business={business}
          categoryName={categoryMap?.get(business.categorySlug)?.name}
        />
      ))}
    </div>
  );
}
