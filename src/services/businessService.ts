import { businesses } from '../data/businesses';
import type { Business, BusinessFilters } from '../types';
import { isBusinessOpenNow } from '../utils/businessHours';
import { matchesQuery } from '../utils/search';

const SIMULATED_DELAY = 350;

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), SIMULATED_DELAY));
}

export function getBusinesses(): Promise<Business[]> {
  return delay(businesses);
}

export function getFeaturedBusinesses(limit = 6): Promise<Business[]> {
  return delay(businesses.filter((b) => b.featured).slice(0, limit));
}

export function getBusinessBySlug(slug: string): Promise<Business | undefined> {
  return delay(businesses.find((b) => b.slug === slug));
}

export function getBusinessesByCategory(categorySlug: string): Promise<Business[]> {
  return delay(businesses.filter((b) => b.categorySlug === categorySlug));
}

function matchesBusiness(business: Business, query: string): boolean {
  if (!query.trim()) return true;
  return (
    matchesQuery(business.name, query) ||
    matchesQuery(business.description, query) ||
    matchesQuery(business.categorySlug, query) ||
    (business.subcategories ?? []).some((s) => matchesQuery(s, query)) ||
    business.services.some((s) => matchesQuery(s, query)) ||
    matchesQuery(business.neighborhood ?? '', query)
  );
}

export function searchBusinesses(filters: BusinessFilters = {}): Promise<Business[]> {
  const { query = '', categorySlug, openNow, sort = 'relevancia' } = filters;

  let results = businesses.filter((b) => matchesBusiness(b, query));

  if (categorySlug) {
    results = results.filter((b) => b.categorySlug === categorySlug);
  }

  if (openNow) {
    results = results.filter((b) => isBusinessOpenNow(b));
  }

  const sorted = [...results];
  if (sort === 'nombre') {
    sorted.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === 'abiertos') {
    sorted.sort((a, b) => Number(isBusinessOpenNow(b)) - Number(isBusinessOpenNow(a)));
  }

  return delay(sorted);
}
