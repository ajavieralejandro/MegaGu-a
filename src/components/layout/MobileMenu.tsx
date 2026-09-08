import { MapPinned, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface NavItem {
  label: string;
  to: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
}

export function MobileMenu({ isOpen, onClose, navItems }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 sm:hidden" role="dialog" aria-modal="true">
      <button
        type="button"
        aria-label="Cerrar menú"
        onClick={onClose}
        className="absolute inset-0 bg-ink-950/40"
      />
      <nav
        aria-label="Navegación principal"
        className="absolute inset-y-0 right-0 flex w-72 max-w-[85%] flex-col gap-1 bg-white p-5 shadow-xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <span className="flex items-center gap-1.5 font-extrabold text-ink-900">
            <MapPinned className="size-5 text-brand-600" aria-hidden="true" />
            MegaGuía Bahía
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar menú"
            className="rounded-full p-2 text-ink-500 hover:bg-ink-100 focus-visible:outline-brand-600"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onClose}
            className={({ isActive }) =>
              `rounded-xl px-3 py-3 text-base font-medium ${
                isActive ? 'bg-brand-50 text-brand-700' : 'text-ink-700 hover:bg-ink-50'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}

        <NavLink
          to="/sumate"
          onClick={onClose}
          className="mt-4 rounded-full bg-brand-600 px-4 py-3 text-center text-base font-semibold text-white hover:bg-brand-700"
        >
          Publicar mi negocio
        </NavLink>
      </nav>
    </div>
  );
}
