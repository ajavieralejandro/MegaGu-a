import { Link } from 'react-router-dom';
import { EmptyState } from '../components/ui/EmptyState';

export function NotFoundPage() {
  return (
    <div className="mx-auto flex max-w-3xl items-center justify-center px-4 py-24 sm:px-6">
      <EmptyState
        title="Página no encontrada"
        description="La página que buscás no existe o fue movida."
        action={
          <Link
            to="/"
            className="inline-flex items-center rounded-full bg-ink-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Volver al inicio
          </Link>
        }
      />
    </div>
  );
}
