import type { Category, SortOption } from '../../types';

interface FilterBarProps {
  categories: Category[];
  categorySlug: string;
  onCategoryChange: (slug: string) => void;
  openNow: boolean;
  onOpenNowChange: (value: boolean) => void;
  sort: SortOption;
  onSortChange: (value: SortOption) => void;
}

export function FilterBar({
  categories,
  categorySlug,
  onCategoryChange,
  openNow,
  onOpenNowChange,
  sort,
  onSortChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-ink-100 bg-white p-3">
      <div className="flex flex-col gap-1">
        <label htmlFor="filter-category" className="text-xs font-medium text-ink-500">
          Categoría
        </label>
        <select
          id="filter-category"
          value={categorySlug}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="rounded-lg border border-ink-200 bg-white px-3 py-1.5 text-sm text-ink-800 focus-visible:outline-brand-600"
        >
          <option value="">Todas</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="filter-sort" className="text-xs font-medium text-ink-500">
          Ordenar por
        </label>
        <select
          id="filter-sort"
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="rounded-lg border border-ink-200 bg-white px-3 py-1.5 text-sm text-ink-800 focus-visible:outline-brand-600"
        >
          <option value="relevancia">Relevancia</option>
          <option value="nombre">Nombre</option>
          <option value="abiertos">Abiertos ahora</option>
        </select>
      </div>

      <label className="ml-auto flex cursor-pointer items-center gap-2 self-end pb-1.5 text-sm font-medium text-ink-700">
        <input
          type="checkbox"
          checked={openNow}
          onChange={(e) => onOpenNowChange(e.target.checked)}
          className="size-4 rounded border-ink-300 text-brand-600 focus-visible:outline-brand-600"
        />
        Abierto ahora
      </label>
    </div>
  );
}
