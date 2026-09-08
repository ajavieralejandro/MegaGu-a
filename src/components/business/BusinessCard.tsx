import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Business } from '../../types';
import { getOpeningSummary, isBusinessOpenNow } from '../../utils/businessHours';
import { Badge } from '../ui/Badge';

interface BusinessCardProps {
  business: Business;
  categoryName?: string;
}

export function BusinessCard({ business, categoryName }: BusinessCardProps) {
  const open = isBusinessOpenNow(business);

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <Link
        to={`/negocio/${business.slug}`}
        className="relative block aspect-[4/3] overflow-hidden bg-ink-100 focus-visible:outline-brand-600"
      >
        <img
          src={business.images[0]}
          alt={business.name}
          loading="lazy"
          className="size-full object-cover transition duration-300 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3">
          <Badge tone={open ? 'open' : 'closed'}>{open ? 'Abierto' : 'Cerrado'}</Badge>
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-bold text-ink-900">
            <Link
              to={`/negocio/${business.slug}`}
              className="hover:text-brand-700 focus-visible:outline-brand-600"
            >
              {business.name}
            </Link>
          </h3>
          {business.rating && (
            <span className="shrink-0 text-sm font-semibold text-sun-600">
              ★ {business.rating.toFixed(1)}
            </span>
          )}
        </div>

        {categoryName && <p className="text-sm font-medium text-brand-600">{categoryName}</p>}

        <p className="flex items-center gap-1.5 text-sm text-ink-500">
          <MapPin className="size-4 shrink-0" aria-hidden="true" />
          <span className="truncate">
            {business.neighborhood ? `${business.neighborhood} · ` : ''}
            {business.address}
          </span>
        </p>

        <p className="text-sm text-ink-400">{getOpeningSummary(business)}</p>

        <Link
          to={`/negocio/${business.slug}`}
          className="mt-auto inline-flex items-center justify-center rounded-full bg-ink-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 focus-visible:outline-brand-600"
        >
          Ver negocio
        </Link>
      </div>
    </article>
  );
}
