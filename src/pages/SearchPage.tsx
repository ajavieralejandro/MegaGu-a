import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BusinessGrid } from '../components/business/BusinessGrid';
import { SearchBar } from '../components/search/SearchBar';
import { FilterBar } from '../components/search/FilterBar';
import { EmptyState } from '../components/ui/EmptyState';
import { BusinessGridSkeleton } from '../components/ui/Skeleton';
import { useAsync } from '../hooks/useAsync';
import { useCategories } from '../hooks/useCategories';
import { searchBusinesses } from '../services/businessService';
import type { SortOption } from '../types';

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { categories, categoryMap } = useCategories();

  const query = searchParams.get('q') ?? '';
  const categorySlug = searchParams.get('categoria') ?? '';
  const openNow = searchParams.get('abierto') === '1';
  const sort = (searchParams.get('orden') as SortOption) || 'relevancia';

  const { data: results, loading } = useAsync(
    () => searchBusinesses({ query, categorySlug: categorySlug || undefined, openNow, sort }),
    [query, categorySlug, openNow, sort],
  );

  useEffect(() => {
    document.title = query
      ? `Resultados para "${query}" · MegaGuía Bahía`
      : 'Explorar comercios · MegaGuía Bahía';
  }, [query]);

  function updateParam(key: string, value: string) {
    const next = new URLSearchParams(searchParams);
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    setSearchParams(next);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-extrabold text-ink-950 sm:text-3xl">
        {query ? (
          <>
            Resultados para <span className="text-brand-600">&ldquo;{query}&rdquo;</span>
          </>
        ) : (
          'Explorá comercios en Bahía Blanca'
        )}
      </h1>

      <div className="mt-5 max-w-2xl">
        <SearchBar
          defaultValue={query}
          onSearch={(value) => updateParam('q', value.trim())}
        />
      </div>

      <div className="mt-5">
        <FilterBar
          categories={categories}
          categorySlug={categorySlug}
          onCategoryChange={(value) => updateParam('categoria', value)}
          openNow={openNow}
          onOpenNowChange={(value) => updateParam('abierto', value ? '1' : '')}
          sort={sort}
          onSortChange={(value) => updateParam('orden', value === 'relevancia' ? '' : value)}
        />
      </div>

      <p className="mt-5 text-sm font-medium text-ink-500">
        {loading ? 'Buscando…' : `${results?.length ?? 0} resultado(s) encontrado(s)`}
      </p>

      <div className="mt-4">
        {loading ? (
          <BusinessGridSkeleton />
        ) : results && results.length > 0 ? (
          <BusinessGrid businesses={results} categoryMap={categoryMap} />
        ) : (
          <EmptyState
            title="No encontramos resultados"
            description="Probá con otra palabra clave, quitá filtros o buscá una categoría más general."
          />
        )}
      </div>
    </div>
  );
}
