import {
  Ambulance,
  Bike,
  Car,
  Clock3,
  KeyRound,
  MapPin,
  PawPrint,
  Pill,
  Sparkle,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BusinessCard } from '../components/business/BusinessCard';
import { CategoryCard } from '../components/category/CategoryCard';
import { SearchBar } from '../components/search/SearchBar';
import { BusinessGridSkeleton } from '../components/ui/Skeleton';
import { SectionHeader } from '../components/ui/SectionHeader';
import { useAsync } from '../hooks/useAsync';
import { useCategories } from '../hooks/useCategories';
import { getFeaturedBusinesses, getBusinesses } from '../services/businessService';
import { isBusinessOpenNow } from '../utils/businessHours';

const QUICK_ACCESS = [
  { label: 'Restaurantes', query: 'restaurante' },
  { label: 'Farmacias', query: 'farmacia' },
  { label: 'Mecánicos', query: 'mecánico' },
  { label: 'Cerrajeros', query: 'cerrajero' },
  { label: 'Veterinarias', query: 'veterinaria' },
];

const QUICK_NEEDS = [
  { label: 'Farmacias de turno', query: 'farmacia', icon: Pill },
  { label: 'Cerrajeros', query: 'cerrajero', icon: KeyRound },
  { label: 'Auxilio mecánico', query: 'auxilio mecánico', icon: Car },
  { label: 'Delivery', query: 'delivery', icon: Bike },
  { label: 'Veterinarias', query: 'veterinaria', icon: PawPrint },
  { label: 'Emergencias', query: 'urgencias', icon: Ambulance },
];

type DiscoverTab = 'nuevos' | 'buscados' | 'cerca' | 'abiertos';

const DISCOVER_TABS: { id: DiscoverTab; label: string }[] = [
  { id: 'nuevos', label: 'Nuevos' },
  { id: 'buscados', label: 'Más buscados' },
  { id: 'cerca', label: 'Cerca tuyo' },
  { id: 'abiertos', label: 'Abiertos ahora' },
];

export function HomePage() {
  const { categories, loading: categoriesLoading } = useCategories();
  const { data: featured, loading: featuredLoading } = useAsync(
    () => getFeaturedBusinesses(6),
    [],
  );
  const { data: allBusinesses, loading: businessesLoading } = useAsync(
    () => getBusinesses(),
    [],
  );

  const [discoverTab, setDiscoverTab] = useState<DiscoverTab>('nuevos');

  const discoverResults = useMemo(() => {
    const list = allBusinesses ?? [];
    switch (discoverTab) {
      case 'buscados':
        return [...list].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0)).slice(0, 6);
      case 'cerca':
        return list.filter((b) => b.neighborhood === 'Centro').slice(0, 6);
      case 'abiertos':
        return list.filter((b) => isBusinessOpenNow(b)).slice(0, 6);
      case 'nuevos':
      default:
        return [...list].reverse().slice(0, 6);
    }
  }, [allBusinesses, discoverTab]);

  return (
    <div>
      {/* HERO */}
      <section className="border-b border-ink-100 bg-gradient-to-b from-brand-50 to-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand-700 shadow-sm">
              <MapPin className="size-3.5" aria-hidden="true" />
              Bahía Blanca
            </span>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-950 sm:text-5xl">
              Todo Bahía, en un solo lugar
            </h1>
            <p className="mt-4 text-base text-ink-600 sm:text-lg">
              Encontrá comercios, profesionales y servicios cerca tuyo.
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-2xl">
            <SearchBar size="lg" />
          </div>

          <div className="mx-auto mt-6 flex max-w-3xl flex-wrap justify-center gap-2">
            {QUICK_ACCESS.map((item) => (
              <Link
                key={item.label}
                to={`/buscar?q=${encodeURIComponent(item.query)}`}
                className="rounded-full border border-ink-200 bg-white px-4 py-1.5 text-sm font-medium text-ink-600 transition hover:border-brand-300 hover:text-brand-700"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORÍAS */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <SectionHeader
          eyebrow="Explorá"
          title="Categorías principales"
          description="Elegí qué necesitás y descubrí los mejores lugares de la ciudad."
          action={{ label: 'Ver todas las categorías', to: '/categorias' }}
        />

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {categoriesLoading
            ? Array.from({ length: 10 }).map((_, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <div key={i} className="h-32 animate-pulse rounded-2xl bg-ink-100" />
              ))
            : categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
        </div>
      </section>

      {/* DESTACADOS */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeader
            eyebrow="Selección"
            title="Destacados en Bahía"
            description="Comercios y profesionales recomendados por la comunidad."
            action={{ label: 'Ver todos', to: '/buscar' }}
          />

          <div className="mt-8">
            {featuredLoading ? (
              <BusinessGridSkeleton count={6} />
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {(featured ?? []).map((business) => (
                  <BusinessCard key={business.id} business={business} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* NECESIDADES RÁPIDAS */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <SectionHeader
          eyebrow="Urgente"
          title="¿Necesitás algo ahora?"
          description="Accesos directos para resolver imprevistos rápido."
        />

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {QUICK_NEEDS.map(({ label, query, icon: Icon }) => (
            <Link
              key={label}
              to={`/buscar?q=${encodeURIComponent(query)}`}
              className="flex flex-col items-center gap-2 rounded-2xl border border-ink-100 bg-white p-4 text-center transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-sun-100 text-sun-600">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <span className="text-sm font-medium text-ink-800">{label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* DESCUBRIR */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeader eyebrow="Explorá más" title="Descubrí Bahía" />

          <div
            role="tablist"
            aria-label="Descubrí Bahía"
            className="no-scrollbar mt-6 flex gap-2 overflow-x-auto pb-1"
          >
            {DISCOVER_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={discoverTab === tab.id}
                onClick={() => setDiscoverTab(tab.id)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                  discoverTab === tab.id
                    ? 'bg-ink-900 text-white'
                    : 'bg-ink-100 text-ink-600 hover:bg-ink-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mt-6">
            {businessesLoading ? (
              <BusinessGridSkeleton count={3} />
            ) : discoverResults.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {discoverResults.map((business) => (
                  <BusinessCard key={business.id} business={business} />
                ))}
              </div>
            ) : (
              <p className="rounded-2xl border border-dashed border-ink-200 py-10 text-center text-ink-400">
                No hay resultados para esta selección todavía.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* CTA COMERCIOS */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex flex-col items-center gap-6 rounded-3xl bg-ink-950 px-6 py-12 text-center sm:px-16">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-500/20 px-2.5 py-1 text-xs font-semibold text-brand-200">
            <Sparkle className="size-3.5" aria-hidden="true" />
            Para comercios
          </span>
          <h2 className="max-w-lg text-2xl font-bold text-white sm:text-3xl">
            ¿Tenés un comercio?
          </h2>
          <p className="max-w-md text-ink-300">
            Sumate a MegaGuía y hacé que más personas encuentren tu negocio.
          </p>
          <Link
            to="/sumate"
            className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-ink-950 transition hover:bg-brand-400"
          >
            <Clock3 className="size-4" aria-hidden="true" />
            Publicar mi negocio
          </Link>
        </div>
      </section>
    </div>
  );
}
