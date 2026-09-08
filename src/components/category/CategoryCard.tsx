import { Link } from 'react-router-dom';
import type { Category } from '../../types';
import { CategoryIcon } from '../ui/CategoryIcon';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      to={`/categoria/${category.slug}`}
      className="group flex flex-col items-start gap-3 rounded-2xl border border-ink-100 bg-white p-5 transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md focus-visible:outline-brand-600"
    >
      <span className="flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition group-hover:bg-brand-600 group-hover:text-white">
        <CategoryIcon icon={category.icon} className="size-6" />
      </span>
      <span className="font-semibold text-ink-900">{category.name}</span>
      {category.description && (
        <span className="text-sm text-ink-500">{category.description}</span>
      )}
    </Link>
  );
}
