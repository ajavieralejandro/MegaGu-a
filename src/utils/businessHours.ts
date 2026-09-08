import type { Business, BusinessHours } from '../types';

const DAY_LABELS = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
];

export function getDayLabel(day: number): string {
  return DAY_LABELS[day] ?? '';
}

export function getTodayHours(
  business: Pick<Business, 'hours'>,
  date: Date = new Date(),
): BusinessHours | undefined {
  const day = date.getDay();
  return business.hours.find((h) => h.day === day);
}

function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

export function isBusinessOpenNow(
  business: Pick<Business, 'hours'>,
  date: Date = new Date(),
): boolean {
  const today = getTodayHours(business, date);
  if (!today || today.closed) return false;

  const nowMinutes = date.getHours() * 60 + date.getMinutes();

  const inRange = (open?: string, close?: string) => {
    if (!open || !close) return false;
    const openMinutes = timeToMinutes(open);
    const closeMinutes = timeToMinutes(close);
    if (closeMinutes <= openMinutes) {
      // Rango que cruza la medianoche (ej: cerrajerías 24hs)
      return nowMinutes >= openMinutes || nowMinutes <= closeMinutes;
    }
    return nowMinutes >= openMinutes && nowMinutes <= closeMinutes;
  };

  return (
    inRange(today.open, today.close) ||
    inRange(today.secondOpen, today.secondClose)
  );
}

export function formatHoursRange(open?: string, close?: string): string {
  if (!open || !close) return '';
  return `${open} - ${close}`;
}

export function getOpeningSummary(business: Pick<Business, 'hours'>): string {
  const today = getTodayHours(business);
  if (!today || today.closed) return 'Cerrado hoy';

  const ranges = [
    formatHoursRange(today.open, today.close),
    formatHoursRange(today.secondOpen, today.secondClose),
  ].filter(Boolean);

  return ranges.length > 0 ? ranges.join(' y ') : 'Cerrado hoy';
}
