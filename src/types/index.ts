export interface Category {
  id: string;
  slug: string;
  name: string;
  icon: string;
  description?: string;
  parentId?: string | null;
  subcategories?: string[];
}

export interface BusinessHours {
  /** 0 = domingo … 6 = sábado, igual que Date#getDay() */
  day: number;
  open?: string;
  close?: string;
  secondOpen?: string;
  secondClose?: string;
  closed?: boolean;
}

export interface Business {
  id: string;
  slug: string;
  name: string;
  description: string;
  categorySlug: string;
  subcategories?: string[];
  address: string;
  neighborhood?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  website?: string;
  instagram?: string;
  facebook?: string;
  images: string[];
  services: string[];
  hours: BusinessHours[];
  featured?: boolean;
  rating?: number;
}

export type SortOption = 'relevancia' | 'nombre' | 'abiertos';

export interface BusinessFilters {
  query?: string;
  categorySlug?: string;
  openNow?: boolean;
  sort?: SortOption;
}
