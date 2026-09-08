import { AtSign, MapPinned } from 'lucide-react';
import { Link } from 'react-router-dom';

const LINKS = [
  { label: 'Inicio', to: '/' },
  { label: 'Categorías', to: '/categorias' },
  { label: 'Explorar comercios', to: '/buscar' },
  { label: 'Publicar mi negocio', to: '/sumate' },
];

export function Footer() {
  return (
    <footer className="border-t border-ink-100 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          <div>
            <span className="flex items-center gap-1.5 text-lg font-extrabold text-ink-900">
              <MapPinned className="size-5 text-brand-600" aria-hidden="true" />
              MegaGuía Bahía
            </span>
            <p className="mt-3 max-w-xs text-sm text-ink-500">
              La guía local para encontrar comercios, servicios y profesionales en Bahía
              Blanca.
            </p>
          </div>

          <nav aria-label="Enlaces del sitio">
            <h3 className="mb-3 text-sm font-semibold text-ink-900">Navegación</h3>
            <ul className="space-y-2 text-sm">
              {LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-ink-500 hover:text-brand-700">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-ink-900">Contacto y redes</h3>
            <ul className="space-y-2 text-sm text-ink-500">
              <li>contacto@megaguiabahia.com.ar</li>
              <li>Bahía Blanca, Argentina</li>
            </ul>
            <div className="mt-3 flex gap-2">
              <span className="flex size-9 items-center justify-center rounded-full bg-ink-100 text-ink-500">
                <AtSign className="size-4" aria-hidden="true" />
              </span>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-ink-100 pt-6 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} MegaGuía Bahía. Todos los derechos reservados.</p>
          <p>Privacidad · Términos</p>
        </div>
      </div>
    </footer>
  );
}
