import { MapPinned, Menu } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MobileMenu } from './MobileMenu';

const NAV_ITEMS = [
  { label: 'Inicio', to: '/' },
  { label: 'Categorías', to: '/categorias' },
  { label: 'Explorar', to: '/buscar' },
  { label: 'Para comercios', to: '/sumate' },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink-100 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <NavLink
          to="/"
          className="flex items-center gap-1.5 text-lg font-extrabold text-ink-900 focus-visible:outline-brand-600"
        >
          <MapPinned className="size-6 text-brand-600" aria-hidden="true" />
          MegaGuía Bahía
        </NavLink>

        <nav aria-label="Navegación principal" className="hidden items-center gap-1 sm:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `rounded-full px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-ink-600 hover:bg-ink-50 hover:text-ink-900'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <NavLink
            to="/sumate"
            className="hidden rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 focus-visible:outline-brand-800 sm:inline-flex"
          >
            Publicar mi negocio
          </NavLink>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menú"
            className="inline-flex items-center justify-center rounded-full p-2 text-ink-700 hover:bg-ink-100 focus-visible:outline-brand-600 sm:hidden"
          >
            <Menu className="size-6" aria-hidden="true" />
          </button>
        </div>
      </div>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} navItems={NAV_ITEMS} />
    </header>
  );
}
