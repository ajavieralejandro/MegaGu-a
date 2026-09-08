import { ChevronRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BusinessGrid } from '../components/business/BusinessGrid';
import { CategoryIcon } from '../components/ui/CategoryIcon';
import { EmptyState } from '../components/ui/EmptyState';
import { BusinessGridSkeleton } from '../components/ui/Skeleton';
import { useAsync } from '../hooks/useAsync';
import { useCategories } from '../hooks/useCategories';
import { getBusinessesByCategory } from '../services/businessService';
import { getCategoryBySlug } from '../services/categoryService';

export function CategoryPage() {
  const { slug = '' } = useParams();
  const { categoryMap } = useCategories();
  const [activeSub, setActiveSub] = useState<string | null>(null);

  const { data: category, loading: categoryLoading } = useAsync(
    () => getCategoryBySlug(slug),
    [slug],
  );
  const { data: businesses, loading: businessesLoading } = useAsync(
    () => getBusinessesByCategory(slug),
    [slug],
  );

  const filteredBusinesses = useMemo(() => {
    const list = businesses ?? [];
    if (!activeSub) return list;
    return list.filter((b) => b.subcategories?.includes(activeSub));
  }, [businesses, activeSub]);

  if (!categoryLoading && !category) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <EmptyState
          title="No encontramos esa categoría"
          description="Puede que el enlace esté roto o la categoría ya no exista."
          action={
            <Link
              to="/categorias"
              className="inline-flex items-center rounded-full bg-ink-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
            >
              Ver todas las categorías
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-ink-400">
        <Link to="/" className="hover:text-brand-700">
          Inicio
        </Link>
        <ChevronRight className="size-3.5" aria-hidden="true" />
        <Link to="/categorias" className="hover:text-brand-700">
          Categorías
        </Link>
        <ChevronRight className="size-3.5" aria-hidden="true" />
        <span className="font-medium text-ink-700">{category?.name ?? '...'}</span>
      </nav>

      <div className="mt-4 flex items-center gap-3">
        {category && (
          <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
            <CategoryIcon icon={category.icon} className="size-6" />
          </span>
        )}
        <h1 className="text-2xl font-extrabold text-ink-950 sm:text-3xl">
          {category?.name ?? 'Categoría'} en Bahía Blanca
        </h1>
      </div>

      {category?.subcategories && category.subcategories.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveSub(null)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              activeSub === null
                ? 'bg-ink-900 text-white'
                : 'bg-white text-ink-600 ring-1 ring-ink-200 hover:bg-ink-50'
            }`}
          >
            Todas
          </button>
          {category.subcategories.map((sub) => (
            <button
              key={sub}
              type="button"
              onClick={() => setActiveSub(sub)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                activeSub === sub
                  ? 'bg-ink-900 text-white'
                  : 'bg-white text-ink-600 ring-1 ring-ink-200 hover:bg-ink-50'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      )}

      <div className="mt-8">
        {businessesLoading ? (
          <BusinessGridSkeleton />
        ) : filteredBusinesses.length > 0 ? (
          <BusinessGrid businesses={filteredBusinesses} categoryMap={categoryMap} />
        ) : (
          <EmptyState
            title="Todavía no hay negocios cargados acá"
            description="Estamos sumando comercios a esta categoría. Volvé a intentarlo más tarde."
          />
        )}
      </div>
    </div>
  );
}
