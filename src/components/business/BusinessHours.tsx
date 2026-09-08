import type { BusinessHours as BusinessHoursType } from '../../types';
import { formatHoursRange, getDayLabel } from '../../utils/businessHours';

interface BusinessHoursProps {
  hours: BusinessHoursType[];
}

const ORDER = [1, 2, 3, 4, 5, 6, 0];

export function BusinessHours({ hours }: BusinessHoursProps) {
  const today = new Date().getDay();
  const byDay = new Map(hours.map((h) => [h.day, h]));

  return (
    <ul className="divide-y divide-ink-100 overflow-hidden rounded-2xl border border-ink-100 bg-white">
      {ORDER.map((day) => {
        const entry = byDay.get(day);
        const isToday = day === today;

        return (
          <li
            key={day}
            className={`flex items-center justify-between gap-4 px-4 py-3 text-sm ${
              isToday ? 'bg-brand-50' : ''
            }`}
          >
            <span
              className={`font-medium ${isToday ? 'text-brand-700' : 'text-ink-700'}`}
            >
              {getDayLabel(day)}
              {isToday && <span className="ml-2 text-xs font-semibold uppercase">Hoy</span>}
            </span>

            {!entry || entry.closed ? (
              <span className="text-ink-400">Cerrado</span>
            ) : (
              <span className="text-right text-ink-600">
                <span className="block">{formatHoursRange(entry.open, entry.close)}</span>
                {entry.secondOpen && (
                  <span className="block">
                    {formatHoursRange(entry.secondOpen, entry.secondClose)}
                  </span>
                )}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
