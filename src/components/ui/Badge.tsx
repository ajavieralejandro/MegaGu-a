import type { ReactNode } from 'react';

type BadgeTone = 'brand' | 'open' | 'closed' | 'neutral';

const TONE_CLASSES: Record<BadgeTone, string> = {
  brand: 'bg-brand-100 text-brand-700',
  open: 'bg-emerald-100 text-emerald-700',
  closed: 'bg-ink-200 text-ink-600',
  neutral: 'bg-ink-100 text-ink-700',
};

interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}

export function Badge({ children, tone = 'neutral', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${TONE_CLASSES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
