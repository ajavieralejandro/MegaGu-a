import {
  AtSign,
  ChevronRight,
  ExternalLink,
  Globe,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Share2,
} from 'lucide-react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BusinessHours } from '../components/business/BusinessHours';
import { Badge } from '../components/ui/Badge';
import { EmptyState } from '../components/ui/EmptyState';
import { Skeleton } from '../components/ui/Skeleton';
import { useAsync } from '../hooks/useAsync';
import { useCategories } from '../hooks/useCategories';
import { getBusinessBySlug } from '../services/businessService';
import { isBusinessOpenNow } from '../utils/businessHours';

export function BusinessPage() {
  const { slug = '' } = useParams();
  const { categoryMap } = useCategories();
  const [activeImage, setActiveImage] = useState(0);

  const { data: business, loading } = useAsync(() => getBusinessBySlug(slug), [slug]);

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <Skeleton className="h-72 w-full sm:h-96" />
        <div className="mt-6 space-y-3">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <EmptyState
          title="No encontramos este negocio"
          description="El comercio que buscás no existe o cambió de dirección."
          action={
            <Link
              to="/buscar"
              className="inline-flex items-center rounded-full bg-ink-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
            >
              Explorar comercios
            </Link>
          }
        />
      </div>
    );
  }

  const category = categoryMap.get(business.categorySlug);
  const open = isBusinessOpenNow(business);
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${business.address}, Bahía Blanca`,
  )}`;

  async function handleShare() {
    const shareData = {
      title: business!.name,
      text: `Mirá ${business!.name} en MegaGuía Bahía`,
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // el usuario canceló el share, no hacemos nada
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      window.alert('Enlace copiado al portapapeles');
    }
  }

  return (
    <div>
      {/* GALERÍA */}
      <div className="mx-auto max-w-5xl px-4 pt-6 sm:px-6">
        <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-sm text-ink-400">
          <Link to="/" className="hover:text-brand-700">
            Inicio
          </Link>
          <ChevronRight className="size-3.5" aria-hidden="true" />
          {category && (
            <>
              <Link to={`/categoria/${category.slug}`} className="hover:text-brand-700">
                {category.name}
              </Link>
              <ChevronRight className="size-3.5" aria-hidden="true" />
            </>
          )}
          <span className="truncate font-medium text-ink-700">{business.name}</span>
        </nav>

        <div className="overflow-hidden rounded-3xl bg-ink-100">
          <img
            src={business.images[activeImage]}
            alt={business.name}
            className="aspect-[16/9] w-full object-cover sm:aspect-[21/9]"
          />
        </div>

        {business.images.length > 1 && (
          <div className="mt-3 flex gap-2 overflow-x-auto">
            {business.images.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setActiveImage(index)}
                aria-label={`Ver imagen ${index + 1} de ${business.name}`}
                aria-current={index === activeImage}
                className={`h-16 w-24 shrink-0 overflow-hidden rounded-xl ring-2 transition ${
                  index === activeImage ? 'ring-brand-600' : 'ring-transparent'
                }`}
              >
                <img src={image} alt="" className="size-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {/* INFO PRINCIPAL */}
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone={open ? 'open' : 'closed'}>{open ? 'Abierto ahora' : 'Cerrado'}</Badge>
              {category && <Badge tone="brand">{category.name}</Badge>}
              {business.rating && (
                <span className="text-sm font-semibold text-sun-600">
                  ★ {business.rating.toFixed(1)}
                </span>
              )}
            </div>

            <h1 className="mt-3 text-2xl font-extrabold text-ink-950 sm:text-3xl">
              {business.name}
            </h1>

            <p className="mt-2 flex items-center gap-1.5 text-ink-500">
              <MapPin className="size-4 shrink-0" aria-hidden="true" />
              {business.neighborhood ? `${business.neighborhood} · ` : ''}
              {business.address}
            </p>

            {/* CTA */}
            <div className="mt-6 flex flex-wrap gap-2">
              {business.whatsapp && (
                <a
                  href={`https://wa.me/${business.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                  WhatsApp
                </a>
              )}
              {business.phone && (
                <a
                  href={`tel:${business.phone}`}
                  className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-ink-800"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  Llamar
                </a>
              )}
              <a
                href={mapsHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-ink-800 ring-1 ring-ink-200 transition hover:bg-ink-50"
              >
                <Navigation className="size-4" aria-hidden="true" />
                Cómo llegar
              </a>
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-ink-800 ring-1 ring-ink-200 transition hover:bg-ink-50"
              >
                <Share2 className="size-4" aria-hidden="true" />
                Compartir
              </button>
            </div>

            {/* DESCRIPCIÓN */}
            <section className="mt-10">
              <h2 className="text-lg font-bold text-ink-900">Sobre el negocio</h2>
              <p className="mt-2 leading-relaxed text-ink-600">{business.description}</p>
            </section>

            {/* SERVICIOS */}
            {business.services.length > 0 && (
              <section className="mt-8">
                <h2 className="text-lg font-bold text-ink-900">Servicios</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {business.services.map((service) => (
                    <span
                      key={service}
                      className="rounded-full bg-brand-50 px-3 py-1.5 text-sm font-medium text-brand-700"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* UBICACIÓN */}
            <section className="mt-8">
              <h2 className="text-lg font-bold text-ink-900">Ubicación</h2>
              <div className="mt-3 flex h-48 flex-col items-center justify-center gap-1 rounded-2xl border border-dashed border-ink-200 bg-ink-50 text-ink-400">
                <MapPin className="size-6" aria-hidden="true" />
                <p className="text-sm">Mapa disponible próximamente</p>
              </div>
              <p className="mt-2 text-sm text-ink-500">
                {business.address}
                {business.neighborhood ? ` · ${business.neighborhood}` : ''}, Bahía Blanca
              </p>
            </section>
          </div>

          <div className="space-y-6">
            {/* HORARIOS */}
            <section>
              <h2 className="mb-3 text-lg font-bold text-ink-900">Horarios</h2>
              <BusinessHours hours={business.hours} />
            </section>

            {/* REDES */}
            {(business.instagram || business.facebook || business.website) && (
              <section>
                <h2 className="mb-3 text-lg font-bold text-ink-900">Redes</h2>
                <ul className="space-y-2">
                  {business.instagram && (
                    <li>
                      <a
                        href={business.instagram}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 rounded-xl border border-ink-100 bg-white px-3 py-2 text-sm font-medium text-ink-700 hover:border-brand-200 hover:text-brand-700"
                      >
                        <AtSign className="size-4" aria-hidden="true" />
                        Instagram
                        <ExternalLink className="ml-auto size-3.5 text-ink-300" aria-hidden="true" />
                      </a>
                    </li>
                  )}
                  {business.facebook && (
                    <li>
                      <a
                        href={business.facebook}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 rounded-xl border border-ink-100 bg-white px-3 py-2 text-sm font-medium text-ink-700 hover:border-brand-200 hover:text-brand-700"
                      >
                        <AtSign className="size-4" aria-hidden="true" />
                        Facebook
                        <ExternalLink className="ml-auto size-3.5 text-ink-300" aria-hidden="true" />
                      </a>
                    </li>
                  )}
                  {business.website && (
                    <li>
                      <a
                        href={business.website}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 rounded-xl border border-ink-100 bg-white px-3 py-2 text-sm font-medium text-ink-700 hover:border-brand-200 hover:text-brand-700"
                      >
                        <Globe className="size-4" aria-hidden="true" />
                        Sitio web
                        <ExternalLink className="ml-auto size-3.5 text-ink-300" aria-hidden="true" />
                      </a>
                    </li>
                  )}
                </ul>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
