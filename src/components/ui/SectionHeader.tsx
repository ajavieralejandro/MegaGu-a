import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: { label: string; to: string };
  children?: ReactNode;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  children,
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && (
          <p className="mb-1 text-sm font-semibold tracking-wide text-brand-600 uppercase">
            {eyebrow}
          </p>
        )}
        <h2 className="text-2xl font-bold text-ink-900 sm:text-3xl">{title}</h2>
        {description && <p className="mt-2 max-w-xl text-ink-500">{description}</p>}
      </div>
      {children}
      {action && (
        <Link
          to={action.to}
          className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-800"
        >
          {action.label}
          <span aria-hidden="true">→</span>
        </Link>
      )}
    </div>
  );
}
