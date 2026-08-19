import { PeriodType } from '../types';

export function uid(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export function todayISO(): string {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

export function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

export function formatDateStr(isoStr: string): string {
  const months = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
  const parts = isoStr.split('-');
  if (parts.length < 3) return isoStr;
  const m = parseInt(parts[1], 10) - 1;
  const d = parseInt(parts[2], 10);
  return `${d} ${months[m] || ''}`;
}

export function inPeriod(dateStr: string, period: PeriodType): boolean {
  if (period === 'all') return true;
  const days = period === 'week' ? 7 : 31;
  const t = new Date(dateStr + 'T12:00:00').getTime();
  return t >= Date.now() - days * 86400000;
}
