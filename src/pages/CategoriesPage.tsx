import { Link } from 'react-router-dom';
import { CategoryIcon } from '../components/ui/CategoryIcon';
import { Skeleton } from '../components/ui/Skeleton';
import { useCategories } from '../hooks/useCategories';

export function CategoriesPage() {
  const { categories, loading } = useCategories();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-extrabold text-ink-950 sm:text-4xl">
          Todas las categorías
        </h1>
        <p className="mt-3 text-ink-500">
          Elegí una categoría para ver comercios, servicios y profesionales
          disponibles en Bahía Blanca.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array.from({ length: 10 }).map((_, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <Skeleton key={i} className="h-40 w-full" />
            ))
          : categories.map((category) => (
              <Link
                key={category.id}
                to={`/categoria/${category.slug}`}
                className="group flex flex-col gap-3 rounded-3xl border border-ink-100 bg-white p-6 transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md focus-visible:outline-brand-600"
              >
                <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 transition group-hover:bg-brand-600 group-hover:text-white">
                  <CategoryIcon icon={category.icon} className="size-6" />
                </span>
                <div>
                  <h2 className="text-lg font-bold text-ink-900">{category.name}</h2>
                  {category.description && (
                    <p className="mt-1 text-sm text-ink-500">{category.description}</p>
                  )}
                </div>
                {category.subcategories && (
                  <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                    {category.subcategories.slice(0, 4).map((sub) => (
                      <span
                        key={sub}
                        className="rounded-full bg-ink-50 px-2.5 py-1 text-xs font-medium text-ink-500"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            ))}
      </div>
    </div>
  );
}
