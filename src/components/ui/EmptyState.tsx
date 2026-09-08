import type { LucideIcon } from 'lucide-react';
import { SearchX } from 'lucide-react';
import type { ReactNode } from 'react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({
  icon: Icon = SearchX,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-ink-200 bg-white px-6 py-16 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-ink-100 text-ink-400">
        <Icon className="size-7" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-semibold text-ink-900">{title}</h3>
      {description && <p className="max-w-sm text-sm text-ink-500">{description}</p>}
      {action}
    </div>
  );
}
