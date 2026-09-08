import { categories } from '../data/categories';
import type { Category } from '../types';

const SIMULATED_DELAY = 250;

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), SIMULATED_DELAY));
}

export function getCategories(): Promise<Category[]> {
  return delay(categories);
}

export function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  return delay(categories.find((c) => c.slug === slug));
}
