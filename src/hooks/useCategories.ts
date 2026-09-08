import { useMemo } from 'react';
import { getCategories } from '../services/categoryService';
import type { Category } from '../types';
import { useAsync } from './useAsync';

interface UseCategoriesResult {
  categories: Category[];
  categoryMap: Map<string, Category>;
  loading: boolean;
}

const EMPTY_CATEGORIES: Category[] = [];

export function useCategories(): UseCategoriesResult {
  const { data, loading } = useAsync(() => getCategories(), []);
  const categories = data ?? EMPTY_CATEGORIES;

  const categoryMap = useMemo(
    () => new Map(categories.map((c) => [c.slug, c])),
    [categories],
  );

  return { categories, categoryMap, loading };
}
